import {
  piniaPlugnsGetStorage,
  piniaPlugnsSetStorage
} from '@/utils/plugins-utils'
import { PiniaPluginContext } from 'pinia'
type Options = {
  key: string
  needKeepIds?: string[]
}

const piniaPlugin = (options: Options) => {
  const { key, needKeepIds = [] } = options
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data: any = piniaPlugnsGetStorage(`${key ?? 'pinia'}-${store.$id}`)
    if (needKeepIds.length === 0) {
      store.$subscribe(() => {
        piniaPlugnsSetStorage(`${key ?? 'pinia'}-${store.$id}`, store.$state)
      })
    } else {
      needKeepIds.includes(store.$id) &&
        store.$subscribe(() => {
          piniaPlugnsSetStorage(`${key ?? 'pinia'}-${store.$id}`, store.$state)
        })
    }

    return {
      ...data
    }
  }
}

export default piniaPlugin
