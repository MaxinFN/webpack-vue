export default [
  {
    path: '/',
    // redirect: '/todo'
    redirect: '/debounce'
  },
  {
    path: '/debounce',
    component: () => import('../views/debounce.vue')
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
  },
  {
    path: '/zhuanpan',
    name: 'zhuanpan',
    component: () => import('../views/zhuanpan.vue')
  },
  {
    path: '/directives',
    name: 'directive',
    component: () => import('../views/demo/demo-directive.vue')
  },
  // slot的 demo 练习
  {
    path: '/slot-demo',
    name: 'slot-demo',
    component: () => import('../views/demo/demo-slot.vue')
  },
  // $attrs 和 $listensers 组件封装
  {
    path: '/attr-demo',
    name: 'attr-demo',
    component: () => import('../views/demo/demo-attr.vue')
  },
]
