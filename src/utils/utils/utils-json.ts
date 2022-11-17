// safeJsonParse JSON 转换
const safeJsonParse = (str: string) => {
  if (!str || typeof str != 'string') {
    return str
  }
  return JSON.parse(str)
}
export default {
  safeJsonParse
}
