import { WechatH5Auth, ExternalAuthenticate, GetShareParams } from '@/api/tokenAuth'
import Vue from 'vue'
import store from '../store'
import Cookies from 'js-cookie'

let tokenAuth = {
    //获取encryptedCode
    getWechatH5Auth(urlDirect) {
        const url = urlDirect ? urlDirect : ''
        WechatH5Auth(Vue.prototype.url + url)
    },

    //微信认证cb
    ExternalAuthenticate(encryptedCode) {
        const param = {
            "authProvider": "WechatH5",
            "providerKey": new Date().getTime(),
            "providerAccessCode": encryptedCode
        }
        ExternalAuthenticate(param).then((result) => {
            result.result.recordTime = new Date().getTime(); //记录时间
            store.dispatch('tokenAuth/setToken', result.result)
            location.reload()
        }).catch((err) => {});
    },
    getAuth(query, urlDirect) {
        const that = this;
        if (query.ctag) {
            Cookies.set('ctag', query.ctag, { expires: 1 })
        }
        store.dispatch('tokenAuth/getAuth', {
            exist: function(token) {},
            none: function() {
                if (query.encryptedCode) {
                    tokenAuth.ExternalAuthenticate(query.encryptedCode)
                } else {
                    tokenAuth.getWechatH5Auth(urlDirect)
                }
            }
        })
    }
}

export default tokenAuth