export const piniaPlugnsGetStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export const piniaPlugnsSetStorage = (key: string, value: string | any) => {
  localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value
  )
}
