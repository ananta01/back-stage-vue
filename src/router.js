import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Reg from './views/Register'
import Login from './views/Login'
import NotFound from './views/NotFound'
import Home from './views/Home'
import UserInfo from './views/UserInfo'
import UserFile from './views/UserFile'
import ElectricitySearch from './views/ElectricitySearch'
import ElectricityInfo from './views/ElectricityInfo'
import UpdateEle from './components/UpdateEle'
import UserMes from './views/UserMes'
import Notice from './views/Notice'

import LocalStorageData from './assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/user',
          name: 'user',
          component: UserInfo
        },
        {
          path: '/electricityinfo',
          name: 'electricityinfo',
          component: ElectricityInfo
        },
        {
          path: '/electricitysearch',
          name: 'ElectricitySearch',
          component: ElectricitySearch
        },
        {
          path: '/usermes',
          name: 'UserMes',
          component: UserMes
        },
        {
          path: '/userfile',
          name: 'userFile',
          component: UserFile
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice
        },
        {
          path: '/updateele',
          name: 'UpdateEle',
          component: UpdateEle
        }
      ]
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorageData.get()
  if (to.path === '/login' || to.path === '/reg') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
