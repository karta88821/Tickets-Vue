import { has } from 'core-js/core/dict'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permissionList: [],
        hasRoute: false, 
        editableTabsValue: "Index",
        editableTabs: [
            {
                title: "首頁",
                name: "Index",
            }
        ]
    },
    getters: {
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermissionList(state, perms) {
            state.permissionList = perms
        },
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute) // 將hasRoute存在session中，重新整理瀏覽器後，左側menu不會被刷新
        },
        addTab(state, tab) {
            // 加入tab前，先看看是否已經存在
            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            // tab不存在，加入
            if (index == -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                });
            }

            // 改變當前成的tab
            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            state.menuList = []
            state.permissionList = []
            state.hasRoute = false
            state.editableTabsValue = "Index"
            state.editableTabs = [
                {
                    title: "首頁",
                    name: "Index",
                }
            ]
        }
    },
    actions: {
    }
}
