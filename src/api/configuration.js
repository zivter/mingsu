import request from '@/utils/request'
const BASE_COUPON_API_PATH = '/api/services/app'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * H5 领券接口
 */
export function GetCommonSettings(data) {
    return request({
        url: BASE_COUPON_API_PATH + '/Configuration/GetCommonSettings',
        headers: headers,
        method: 'GET',
        data
    })
}