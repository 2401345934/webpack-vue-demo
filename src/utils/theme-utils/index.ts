import { ConfigProvider } from 'ant-design-vue'

type ColorParams = {
  [key: string]: any
}
export const changeTheme = (colorParams: ColorParams): void => {
  for (const k in colorParams) {
    document.documentElement.style.setProperty(k, colorParams[k])
  }
  ConfigProvider.config({
    theme: {
      ...colorParams
    }
  })
}
