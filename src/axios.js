import axios from "axios"
import router from "./router"
import Element from "element-ui"

//axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

// 發起request前，先將這個request的header加上jwt token
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

// 收到request後，先看status code是否正確，不正確就跳出error msg，return Promise reject，拒絕往下走
request.interceptors.response.use(
    response => {
        let res = response.data
        if (res.code === 200) {
            return response
        } else {
            Element.Message.error(res.msg ? res.msg : '系統異常')
            return Promise.reject(response.data.msg)
        }
    }, 
    error => {
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status == 401) {
            router.push('/login')
        }

        Element.Message.error(error.message, {duration: 3000})

        return Promise.reject(error)
    }
)

/**
 * Default Exports: Default exports are useful to export only a single object,
 * function, variable. During the import, we can use any name to import. 
 */

export default request