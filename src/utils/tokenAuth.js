import { WechatH5Auth, ExternalAuthenticate, GetShareParams } from '@/api/tokenAuth'
import { GetWechatProfile } from "@/api/account";
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
    /**
     * 获取个人信息
     */
    GetWechatProfile() {
        GetWechatProfile().then((result) => {
            store.dispatch('tokenAuth/setTokenId', result.result.userId)
        })
        .catch((err) => {
        });
    },
    getAuth(query, urlDirect) {
        const that = this;
        tokenAuth.GetWechatProfile()
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