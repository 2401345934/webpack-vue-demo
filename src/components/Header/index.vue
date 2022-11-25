<template name="header">
  <div class="header">
    <div class="header_l" :class="menuStore.$state.collapsed && 'header_l_w'">
      <logo></logo>
    </div>
    <div class="header_c">
      <content></content>
    </div>
    <div class="header_r">
      <div class="change_theme">
        <a-button
          type="primary"
          style="margin-left: 16px"
          @click="changeDrawer()"
          >切换主题</a-button
        >
      </div>
      <div class="user_info">
        <a-dropdown>
          <div @click.prevent>
            <a-avatar :size="36">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            admin
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">退出登陆</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
  <a-drawer v-model:visible="themDrawer">
    <a-row :gutter="16">
      <a-col flex="none">
        <a-space direction="vertical" align="center">
          <!-- Primary Color -->
          <input
            type="color"
            :value="colorState.primaryColor"
            @input="e => onColorChange('primaryColor', e)"
          />
          <span style="color: var(--ant-primary-color)">主题色</span>
          <!-- Error Color -->
          <input
            type="color"
            :value="colorState.errorColor"
            @input="e => onColorChange('errorColor', e)"
          />
          <span style="color: var(--ant-error-color)">失败色</span>
          <!-- Warning Color -->
          <input
            type="color"
            :value="colorState.warningColor"
            @input="e => onColorChange('warningColor', e)"
          />
          <span style="color: var(--ant-warning-color)">警告色</span>
          <!-- Success Color -->
          <input
            type="color"
            :value="colorState.successColor"
            @input="e => onColorChange('successColor', e)"
          />
          <span style="color: var(--ant-success-color)">成功色</span>
          <!-- Info Color -->
          <input
            type="color"
            :value="colorState.infoColor"
            @input="e => onColorChange('infoColor', e)"
          />
          <span style="color: var(--ant-info-color)">提示色</span>
          <input
            type="color"
            :value="colorState['--a-header-bg']"
            @input="e => onColorChange('--a-header-bg', e)"
          />
          <span style="color: var(--ant-info-color)">headers 背景色</span>
          <input
            type="color"
            :value="colorState['--a-menu-bg']"
            @input="e => onColorChange('--a-menu-bg', e)"
          />
          <span style="color: var(--ant-info-color)">menu 背景色</span>
        </a-space>
      </a-col>
    </a-row>
  </a-drawer>
</template>
<script setup lang="ts">
import { theme } from '@/store/module/theme'
import { menu } from '@/store/module/menu'
import logo from './components/logo.vue'
import content from './components/content.vue'
import { ConfigProvider } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
const menuStore = menu()
const store = theme()
const colorState = reactive({
  ...store.$state
})
const themDrawer = ref(false)

const onColorChange = (type: string, e: Event) => {
  Object.assign(colorState, { [type]: (e as Event as any).target.value })
  ConfigProvider.config({
    theme: colorState
  })
  store.changeStateTheme(colorState)
  store.updateTheme()
}

const changeDrawer = () => {
  themDrawer.value = true
}
</script>
<style scoped lang="less">
.header {
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;

  .header_l {
    width: 208px;
    height: 100%;
    transition: var(--menu_transition);
  }

  .header_l_w {
    width: 80px;
    transition: var(--menu_transition);
    min-width: 80px;
  }

  .header_c {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .header_r {
    display: flex;
    margin-right: 20px;
    color: #fff;
    align-items: center;
  }

  .change_theme {
    margin-right: 30px;
  }
}
</style>
