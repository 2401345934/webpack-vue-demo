// 计算首屏加载时间
const getFirstScreenRenderingTime = (): number => {
  return new Date().getTime() - performance.timing.navigationStart
}

// 网页上获取选定的文本
const getSelectedText = (): string | undefined => {
  if (window && window.getSelection) {
    return window.getSelection()?.toString()
  }
  return ''
}

const piniaPlugnsGetStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

const piniaPlugnsSetStorage = (key: string, value: string | any) => {
  localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value
  )
}

export default {
  getFirstScreenRenderingTime,
  getSelectedText,
  piniaPlugnsGetStorage,
  piniaPlugnsSetStorage
}
