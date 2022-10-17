import { createApp } from 'vue'
import App from './index.vue'
import 'ant-design-vue/dist/antd.variable.min.css'
import { router } from './router/index'
import './styles/index.less'

const app = createApp(App)

app.use(router).mount('#app')
