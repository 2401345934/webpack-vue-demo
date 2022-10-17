<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu
        @select="selectMenu"
        v-model:selectedKeys="state.selectedKeys"
        class="ant-layout-sider"
      >
        <a-menu-item v-for="item in routerList" :key="item.path">
          <!-- <user-outlined /> -->
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="state.collapsed"
          class="trigger"
          @click="() => changeCollapsed()"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => changeCollapsed()"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { routerList } from '../../router/index'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { onBeforeMount, reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()

const state: {
  selectedKeys: string[]
  collapsed: boolean
} = reactive({
  selectedKeys: ['/'],
  collapsed: false
})

onBeforeMount(() => {
  state.selectedKeys = [router.currentRoute.value.path]
})

const goRouter = (path: string) => {
  router.push({
    path
  })
}
// 选择菜单
const selectMenu = (e: { key: string; selectedKeys: string[] }) => {
  goRouter(e.key)
  state.selectedKeys = e.selectedKeys
}
// 收起
const changeCollapsed = () => {
  state.collapsed = !state.collapsed
}
</script>

<style lang="less"></style>
