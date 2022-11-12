import { defineStore } from 'pinia'
export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    addCount() {
      this.count++
    }
  }
})
