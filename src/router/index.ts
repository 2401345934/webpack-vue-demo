import { createRouter, createWebHistory } from 'vue-router'

type RouterType = {
  path: string
  name: string
  component: () => Promise<typeof import('*.vue')>
  children?: RouterType[]
  meta?: {
    title: string
    icon: string
  }
}
const routes: RouterType[] = [
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
