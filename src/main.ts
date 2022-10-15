import { createApp } from 'vue'
import App from './index.vue'
import 'ant-design-vue/dist/antd.variable.min.css'
import router from './router/index'

const app = createApp(App)

createApp(App).use(router).mount('#app')
