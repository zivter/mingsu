import request from '@/utils/request'
const BASE_ORDER_API_PATH = '/api/services/app/MemberUser'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * 【H5】获取个人资料
 */
export function GetProfile() {
    return request({
        url: BASE_ORDER_API_PATH + '/GetProfile',
        headers: headers,
        method: 'get'
    })
}

/**
 * 【H5】更新个人资料
 */
export function UpdateProfile(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/UpdateProfile',
        headers: headers,
        method: 'put',
        data
    })
}

/**
 * 【H5】获取个人资料
 */
export function getPerson() {
    return request({
        url: BASE_ORDER_API_PATH + '/Get',
        headers: headers,
        method: 'get'
    })
}

/**
 * 【H5】获取个人资料
 */
export function getPersonAll() {
    return request({
        url: BASE_ORDER_API_PATH + '/GetAll',
        headers: headers,
        method: 'get'
    })
}