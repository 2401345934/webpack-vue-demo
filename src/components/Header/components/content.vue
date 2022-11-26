<template>
  <div class="menuChange">
    <MenuUnfoldOutlined @click="toggleCollapsed" v-if="state.collapsed" />
    <MenuFoldOutlined @click="toggleCollapsed" v-else />
  </div>
  <div class="breadcrumb">
    <a-breadcrumb :routes="routersList">
      <template #separator>
        <span style="color: #fff">/</span>
      </template>
      <template #itemRender="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">{{
          route.meta.title
        }}</span>
        <a v-else @click="toRouter(route, paths)">{{ route.meta.title }}</a>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { menu } from '@/store/module/menu'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import router from '@/router/index'
import { useRouter } from 'vue-router'
import { reactive, ref, watch, onUnmounted } from 'vue'
const routes: any = router.options.routes[0].children
const routers = useRouter()
const routersList = ref(
  routers.currentRoute.value.matched.filter(d => d.path !== '/')
)

const unWatchPath = watch(
  () => routers.currentRoute.value.fullPath,
  () => {
    routersList.value = routers.currentRoute.value.matched.filter(
      d => d.path !== '/'
    )
  }
)

onUnmounted(() => {
  unWatchPath()
})
const toRouter = (route: any, paths: string[]) => {
  if (route.children) {
    return
  }
  routers.push('/' + paths[paths.length - 1])
}

const menuStore = menu()

const state = reactive({
  collapsed: menuStore.$state.collapsed
})

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  menuStore.changeStateMenu(!menuStore.$state.collapsed)
}
</script>
<style scoped lang="less">
.menuChange {
  color: #fff;
  margin-left: 10px;
}

.breadcrumb {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  :deep(.ant-breadcrumb-overlay-link) {
    color: #fff;
  }

  :deep(.ant-breadcrumb-link) {
    color: #fff;

    a {
      color: #fff;
    }
  }
}
</style>
