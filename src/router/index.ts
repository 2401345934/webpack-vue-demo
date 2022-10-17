import { createRouter, createWebHistory } from 'vue-router'

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
  history: createWebHistory(),
  routes
})

const routerList = routes[0].children

export { router, routerList }
