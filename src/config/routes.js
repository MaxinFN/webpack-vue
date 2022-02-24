/*
 * @Author: your name
 * @Date: 2020-08-18 19:51:46
 * @LastEditTime: 2021-07-27 15:38:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\config\routes.js
 */
const MtLayout = () => import('@/components/layout/main')
export default [
  {
    path: '/',
    component: MtLayout,
    children: [
      { path: '', redirect: 'home' },
      {
        path: 'home',
        title: '首页',
        meta: {
          title: 'home'
        },
        component: () => import('@/views/home')
      },
      {
        path: 'auth',
        component: () => import('@/views/auth'),
        children: [
          {
            path: 'menu',
            title: '我的菜单-title',
            meta: {
              title: '我的菜单'
            },
            component: () => import('@/views/auth/menu')
          },
          {
            path: 'role',
            title: '我的角色-title',
            eta: {
              title: '我的角色'
            },
            component: () => import('@/views/auth/role')
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    meta: {
      title: '404'
    },
    component: () => import('@/views/error')
  },
  {
    path: '/*',
    redirect: '/error'
  }
  // {
  //   path: '/',
  //   redirect: '/theme-color-demo'
  // },
  // {
  //   path: '/theme-color-demo',
  //   component: () => import('@/views/partical-demo/day1/demo'),
  //   meta: {
  //     title: '练习主题色替换'
  //   }
  // },
  // {
  //   path: '/debounce',
  //   component: () => import('@/views/debounce')
  // },
  // {
  //   path: '/component',
  //   component: () => import('@/views/components/ele')
  // },
  // {
  //   path: '/todo',
  //   name: 'todo',
  //   component: () => import('@/views/todo')
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login')
  // },
  // {
  //   path: '/demo',
  //   name: 'demo',
  //   component: () => import('@/views/demo')
  // },
  // {
  //   path: '/slot',
  //   name: 'slot',
  //   component: () => import('@/views/slotDemo')
  // },
  // {
  //   path: '/zhuanpan',
  //   name: 'zhuanpan',
  //   component: () => import('@/views/zhuanpan')
  // },
  // {
  //   path: '/directives',
  //   name: 'directive',
  //   component: () => import('@/views/demo/demo-directive')
  // },
  // // slot的 demo 练习
  // {
  //   path: '/slot-demo',
  //   name: 'slot-demo',
  //   component: () => import('@/views/demo/demo-slot')
  // },
  // // $attrs 和 $listensers 组件封装
  // {
  //   path: '/attr-demo',
  //   name: 'attr-demo',
  //   component: () => import('@/views/demo/demo-attr')
  // },
  // {
  //   path: '/canvas',
  //   name: 'canvas-demo',
  //   component: () => import('@/views/demo/canvas')
  // }
]
