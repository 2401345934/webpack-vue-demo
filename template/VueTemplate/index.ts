const createVueSetupTemplate = ({
  cssLoader = 'less',
  langType = 'ts',
  axios = true
}) => {
  return `
<template>
<div>{{ title }}</div> 
</template>
<script setup lang='${langType}'>
${axios && `import request from "@/axios"`}
const title = ref('hello world')
const list = ref([])
${
  axios
    ? `onMounted(() => {
 request({
  url:"XXX/XXX/XX",
  isToast:false,
  converter: ({data}) => {
   list.value = data
  }
})
  console.log('3.-组件挂载到页面之后执行-------onMounted')
})`
    : `onMounted(() => {
  console.log('3.-组件挂载到页面之后执行-------onMounted')
})`
}

</script>
<style scoped lang='${cssLoader}'>
</style>`
}

const createVueTemplate = ({
  cssLoader = 'less',
  langType = 'ts',
  axios = true
}) => {
  return `
<template>
<div>{{ title }}</div>
</template>
<script lang='${langType}'>
${axios && `import request from "@/axios"`}
module.exports = {
  data(){
    return {
      title:"hello world",
      list:[]
    }
  },
  mounted() {
    ${
      axios &&
      `request({
     url:"XXX/XXX/XX",
     isToast:false,
     converter: ({data}) => {
      this.list.value = data
      }
     })`
    }
  },
}
</script>
<style scoped lang='${cssLoader}'>
</style>`
}

// 登录页面模版
const createLoginTemplate = require('./loginTemplate.ts')
// 正常查询列表模版
const createQueryTable = require('./queryTableTemplate.ts')

const exportsConfig = {
  createVueSetupTemplate,
  createVueTemplate,
  createQueryTable,
  createLoginTemplate
}

module.exports = exportsConfig
