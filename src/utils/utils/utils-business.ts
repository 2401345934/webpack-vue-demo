import dayjs from 'dayjs'

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

function queryParams(params: any) {
  for (const key in params) {
    if (typeof params[key] === 'undefined' && !params[key]) {
      params[key] = null
      delete params[key]
    }
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const element = params[key]
      if (element && key.indexOf('*number*') >= 0) {
        const dataParams = key.split('*number*')
        dataParams.forEach((value, index) => {
          params[value] = element[index]
        })
        delete params[key]
      } else if (element && key.indexOf('*address*') >= 0) {
        const dataParams = key.split('*address*')
        dataParams.forEach((value, index) => {
          params[value] = element.PCDCode[index]
        })
        delete params[key]
      } else if (element && key.indexOf('*costType*') >= 0) {
        const dataParams = key.split('*costType*')
        // eslint-disable-next-line prefer-destructuring
        params[dataParams[0]] = element[1]
        delete params[key]
      } else if (element && key.indexOf('*fullDate*') >= 0) {
        const dataParams = key.split('*fullDate*')
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = dayjs(element[index])
              .millisecond(0)
              .second(0)
              .minute(0)
              .hour(0)
              .format('YYYY-MM-DD HH:mm:ss')
          } else {
            params[value] = dayjs(element[index])
              .millisecond(59)
              .second(59)
              .minute(59)
              .hour(23)
              .format('YYYY-MM-DD HH:mm:ss')
          }
        })
        delete params[key]
      } else if (element && key.indexOf('*date*') >= 0) {
        const dataParams = key.split('*date*')
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = dayjs(element[index]).format('YYYY-MM-DD')
          } else {
            params[value] = dayjs(element[index]).format('YYYY-MM-DD')
          }
        })
        delete params[key]
      } else if (element && key.indexOf('*size*') >= 0) {
        const dataParams = key.split('*size*')[0]
        params[dataParams] =
          typeof element === 'string' ? element.toUpperCase() : element
        delete params[key]
      } else if (element && key.indexOf('*') >= 0) {
        const dataParams = key.split('*')
        dataParams.forEach((value, index) => {
          params[value] = element[index].format('YYYY-MM-DD HH:mm:ss')
        })
        delete params[key]
      } else if (Array.isArray(element)) {
        params[key] = element.join(',')
      }
    }
  }
  return params
}

export default {
  getFirstScreenRenderingTime,
  getSelectedText,
  queryParams
}
