import { createApp } from 'vue'
import App from './index.vue'
import 'ant-design-vue/dist/antd.variable.min.css'
import Antd from 'ant-design-vue'

import store from '@/store/index'
import router from './router/index'

import './styles/index.less'

const app = createApp(App)

app.use(router).use(Antd).use(store).mount('#app')
