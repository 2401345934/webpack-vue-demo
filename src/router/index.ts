import { createRouter, createWebHashHistory } from 'vue-router'

export type RouterType = {
  path: string
  name: string
  component: () => Promise<typeof import('*.vue')>
  redirect?: any
  meta?: {
    title: string
    keepAlive?: boolean
  }
  children?: RouterType[]
}

// createWebHistory   history 模式 不带有# 号  刷新时需要后端配合   在某个页面刷新 会以当前url  前往后端请求 需要nginx 做相应的配置 才不会出现 刷新404
const routes: RouterType[] = [
  {
    path: '/',
    component: () => import('@/components/BaseLayout/index.vue'),
    name: 'layout',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  // ...
  // 返回 false 以取消导航
  // 404
  if (to.matched.length === 0) {
    router.push('/404')
  }
})

export default router
