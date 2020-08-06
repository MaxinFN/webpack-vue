export default [
  {
    path: '/',
    // redirect: '/todo'
    redirect: '/component'
  },
  {
    path: '/component',
    component: () => import('../views/components/ele.vue')
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
    name: 'demo',
    component: () => import('../views/demo.vue')
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import('../views/slotDemo.vue')
  }
]
