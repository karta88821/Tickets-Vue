import { has } from 'core-js/core/dict'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permissionList: [],
        hasRoute: false, // 不用一直更新route
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
            sessionStorage.setItem("hasRoute", hasRoute)
        },
        addTab(state, tab) {

            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            if (index == -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                });
            }

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
