//  '-'连接命名转换成小驼峰命名

const _toLittleCamel = (str: string) => {
  if (!str) return ''
  return str.replace(/-(\w)/g, (_, code) => (code ? code.toUpperCase() : ''))
}

//  '-'连接命名转换成大驼峰命名

const _toBigCamel = (str: string) => {
  if (!str) return ''
  return str
    .replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
    .replace(/\S/, code => code.toUpperCase())
}

//  驼峰命名转换成'-'连接命名

const camelTo_ = (str: string) => {
  if (!str) return ''
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export default {
  _toLittleCamel,
  _toBigCamel,
  camelTo_
}
