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

export default {
  getFirstScreenRenderingTime,
  getSelectedText
}
