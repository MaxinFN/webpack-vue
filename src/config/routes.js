export default [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/todo.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/demo',
    name: 'Name',
    component: () => import('../views/demo.vue')
  }
]
