// base64 转换 file
const base64ToFile = async (src: string, name: string) => {
  const b = await fetch(src)
  const blob = await b.blob()
  return new File([blob], name)
}

export default {
  base64ToFile
}
