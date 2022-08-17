<template lang="pug">
div.hello
    h3 {{msg}}
</template>
<script >
export default {
  data(){
    return { msg: "Hello world   1231313131" };
  }
}
</script>

<style lang="less">
body {
  h3 {
  margin: 110px ;
  color: #42b983;
}
}
</style>