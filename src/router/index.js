import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/system/User.vue'
import Role from '../views/system/Role.vue'
import Menu from '../views/system/Menu.vue'
import UserCenter from '../views/system/UserCenter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/system/userCenter',
        name: 'UserCenter',
        component: UserCenter
      },
      {
        path: '/system/users',
        name: 'SystemUser',
        component: User
      },
      {
        path: '/system/roles',
        name: 'SystemRole',
        component: Role
      },
      {
        path: '/system/menus',
        name: 'SystemMenu',
        component: Menu
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
