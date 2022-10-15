import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/index.vue'),
    children: [
      {
        path: '/todo',
        name: 'Todo',
        component: () => import('@/pages/Todo/index.vue'),
        meta: { title: 'Todo List', icon: 'icon-gongzuotai' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
