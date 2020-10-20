// import Vue from "vue"
import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import Vue from 'vue';
import { Notify } from 'vant';
Vue.use(Notify);

axios.defaults.timeout = 10000
    // create an axios instance
const service = axios.create({
    // baseURL: 'https://www.shigvg77.cn/', // api 的 base_url
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000, // request timeout （10s)
    // withCredentials: true,
    debug: false
})

// request interceptor拦截器token
// service.interceptors.request.use(
//   config => {
//     config.withCredentials = true
//     // config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     // config.headers['Content-Type'] = 'application/json'
//     if (store.getters.token) {
//       // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//       config.headers['X-Auth'] = getToken()
//     }
//     if (store.getters.permission_menuid) {
//       config.headers['X-Menu-Id'] = store.getters.permission_menuid
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     // console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
    //  response => response,
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const data = response.data
        if (!data.success) {
            if (data.code === 800 || data.code === 801 || data.code === 802) {
                // if (store.getters.relogin === true) {
                //   return Promise.reject()
                // }
                // // 系统退出
                // store.dispatch('FedLogOut').then(() => {
                //   Notify({ type: 'primary', message: '通知内容' });
                // })

                // Message.error('授权信息为空或已过期，请重新登录')
                // store.dispatch('FedLogOut').then(() => {
                //   location.reload() // 为了重新实例化vue-router对象 避免bug
                // })
                return Promise.reject()
                    // Message.error('授权信息为空或已过期，请重新登录')
                    // return data
            } else if (data.code === 750) {
                return Promise.reject(data.msg || '服务器执行错误，请稍后重试')
            } else {
                return Promise.reject(data.msg)
            }
        }
        return data
    },
    error => {
        if (!error.response) {
            Notify({ type: 'primary', message: error.message })
            return Promise.reject(error.message)
        }

        let msg = ''
            // if (error.response.status === 500) {
            //   msg = '服务器发生未知错误，请稍后重试'
            // } else if (error.response.status === 750) {
            //   msg = error.message || '服务器发生未知错误，请稍后重试'
            // } else {
        msg = error.response.data.error.message
            // }
            // Message.error(msg)
        return Promise.reject(msg)
    }
)

export default service