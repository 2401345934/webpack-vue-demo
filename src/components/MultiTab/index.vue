<template>
  <div
    class="multi_tab"
    :class="[
      $state.fullscreenFlag ? 'full_evaluation' : 'multi_tab',
      menuStore.$state.collapsed && 'multi_tab_w'
    ]"
  >
    <keep-alive>
      <a-tabs
        hide-add
        @change="routerChange"
        type="editable-card"
        @edit="onEdit"
        :activeKey="$state.activeKey"
      >
        <a-tab-pane
          v-for="route in $state.routerList"
          :key="route.path"
          :closable="$state.routerList.length > 1"
          :tab="`${route.name}`"
        >
        </a-tab-pane>
        <template #rightExtra>
          <div class="multi_tab_r">
            <a-space>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <FormOutlined />
                </a>
                <template #overlay>
                  <a-menu @click="handleMenuClick">
                    <a-menu-item key="0">
                      <a>关闭当前页签</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a>关闭左侧页签</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a>关闭右侧页签</a>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a>关闭所有页签</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <a class="ant-dropdown-link" @click.prevent="fullscreenChange">
                <fullscreen-outlined v-show="!$state.fullscreenFlag" />
                <fullscreen-exit-outlined v-show="$state.fullscreenFlag" />
              </a>
            </a-space>
          </div>
        </template>
      </a-tabs>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { multiTab, RouterListType } from '@/store/module/multiTab'
import {
  FullscreenOutlined,
  FormOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue'
import { menu } from '@/store/module/menu'
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import router, { RouterType } from '@/router'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const menuStore = menu()
const route: any = router.options.routes[0].children
const multiTabStore = multiTab()
const {
  $state,
  updateActiveKey,
  addRouter,
  removeRouter,
  replaceRouterList,
  toggleFullscreenFlag
} = multiTabStore
const routerFlat = ref<RouterType[]>([])

// 递归打平
const deepRouter = (routers: RouterType[]) => {
  if (routers && Array.isArray(routers)) {
    routers.forEach((d: RouterType) => {
      if (d.children) {
        deepRouter(d.children)
      } else {
        routerFlat.value.push(d)
      }
    })
  }
}

const routers = useRouter()
const routerChange = (key: string) => {
  routers.push(key)
  updateActiveKey(key)
}

onMounted(() => {
  deepRouter(route)
  const path = routers.currentRoute.value.fullPath
  const to = routers.currentRoute.value
  if ($state.routerList.find(d => d.path === path)) {
    updateActiveKey(path)
    routers.push(path)
  } else {
    addRouter({
      path: to.fullPath,
      name: to.meta.title as string,
      componentName: to.name as string
    })
    updateActiveKey(path)
  }
})
// 标签操作
const handleMenuClick = (info: MenuInfo) => {
  const { key } = info
  const index = $state.routerList.findIndex(
    (d: RouterListType) => d.path === $state.activeKey
  )
  switch (key) {
    case '0':
      return onEdit(routers.currentRoute.value.fullPath)
    case '1':
      replaceRouterList(
        $state.routerList.filter(
          (d: RouterListType, i: number) => i > (index - 1 || 0)
        )
      )
      return
    case '2':
      replaceRouterList(
        $state.routerList.filter(
          (d: RouterListType, i: number) => i < index + 1
        )
      )
      return
    case '3':
      replaceRouterList(
        [
          {
            path: '/welcome',
            name: '首页',
            componentName: 'Welcome'
          }
        ],
        () => {
          updateActiveKey('/welcome')
          routers.push('/welcome')
        }
      )
      return
    default:
      return
  }
}

const fullscreenChange = () => {
  toggleFullscreenFlag()
}

const onEdit = (path: string | number) => {
  removeRouter(path as string, (index: number) => {
    const i = index - 1 < 0 ? 0 : index - 1
    updateActiveKey($state.routerList[i]?.path || '/welcome')
    routers.push($state.activeKey)
  })
}

// TODO 打平留到后面统一打平优化
watch(
  () => routers.currentRoute.value.fullPath,
  () => {
    const to = routers.currentRoute.value
    if (to.fullPath === '/404' || to.fullPath === '/login') {
      return
    }
    if (routerFlat.value.find(d => d.path === to.fullPath)) {
      if ($state.routerList.find(d => d.path === to.fullPath)) {
        updateActiveKey(to.fullPath)
      } else {
        updateActiveKey(to.fullPath)
        addRouter({
          path: to.fullPath,
          name: to.meta.title as string,
          componentName: to.name as string
        })
      }
    }
  }
)
</script>
<style scoped lang="less">
.multi_tab {
  overflow-x: auto;
  position: absolute;
  width: calc(100vw - 208px);
  height: 50px;
  left: 208px;

  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
}

.full_evaluation {
  width: calc(100vw);
  left: 0;
}

.multi_tab_w {
  left: 80px;
  width: calc(100vw - 80px);
}

.multi_tab_r {
  margin-right: 6px;
}
</style>
