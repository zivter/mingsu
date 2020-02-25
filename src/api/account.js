import request from '@/utils/request'
const BASE_ORDER_API_PATH = '/api/services/app/Account'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * 修改密码
 */
export function ChangePassword(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/ChangePassword',
        headers: headers,
        method: 'post',
        data
    })
}

/**
 * 获取账户设置
 */
export function GetWechatProfile() {
    return request({
        url: BASE_ORDER_API_PATH + '/GetProfile',
        headers: headers,
        method: 'get'
    })
}

/**
 * 更新账户设置
 */
export function UpdateProfile(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/UpdateProfile',
        headers: headers,
        method: 'put',
        data
    })
}