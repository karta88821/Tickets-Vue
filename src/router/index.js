import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/system/User.vue'
import Role from '../views/system/Role.vue'
import Menu from '../views/system/Menu.vue'
import UserCenter from '../views/system/UserCenter.vue'

import axios from "axios"
import store from "../store"

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
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 每一個route要進入前會先經過這裡
router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menus.hasRoute

  // 如果已經拿過route，就不用在拿一次
  if (hasRoute) {
    next()
    return
  }

  // 向server取得menu list(這邊的axios不是我們自己定義的axios.js，所以header要加上token)
  axios.get("/system/menu/nav", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => {
      // 取得menu list
      store.commit("setMenuList", res.data.data.nav)
      // 取得用戶權限
      store.commit("setPermissionList", res.data.data.permissions)

      // 動態綁定router
      let newRoutes = router.options.routes

      res.data.data.nav.forEach((menu) => {
        if (menu.children) {
          menu.children.forEach(m => {
            let route = menuToRoute(m)

            if (m) {
              newRoutes[0].children.push(route)
            }
          })
        }
        
      })
      router.addRoutes(newRoutes)

      console.log("update routes")

      hasRoute = true
      store.commit("changeRouteStatus", hasRoute)
    })

  next()
})

// 把 menu 轉成 route
const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }

  let route = {
    path: menu.path,
    name: menu.name,
    component: () => import('@/views/' + menu.component + '.vue'),
    meta: {
      title: menu.title,
      icon: menu.icon
    }
  }

  return route
}


export default router
