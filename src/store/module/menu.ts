import { defineStore } from 'pinia'
export const menu: any = defineStore({
  id: 'menu',
  state: () => {
    return {
      collapsed: false
    }
  },
  getters: {},
  actions: {
    changeStateMenu(collapsed: boolean) {
      this.$state.collapsed = collapsed
    }
  }
})
