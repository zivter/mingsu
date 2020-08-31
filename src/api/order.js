import request from '@/utils/request'
const BASE_ORDER_API_PATH = '/api/services/app/Order'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * 管理后台,订单详情
 */
export function getOrder(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/get',
        headers: headers,
        method: 'get',
        data
    })
}

/**
 * 管理后台，订单列表
 */
export function getAllOrder(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/getAll',
        headers: headers,
        method: 'get',
        data
    })
}

/**
 * H5 下单
 */
export function orderReserve(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/Reserve',
        headers: headers,
        method: 'post',
        data
    })
}

/**
 * H5 确认订单
 */
export function orderReserveConfirm(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/ReserveConfirm',
        headers: headers,
        method: 'post',
        data
    })
}

/**
 * H5请求订单支付
 */
export function orderPayRequest(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/PayRequest',
        headers: headers,
        method: 'post',
        data
    })
}

/**
 * 买家取消订单(未支付)
 */
export function orderCancel(data) {
    return request({
        url: BASE_ORDER_API_PATH + '/Cancel',
        headers: headers,
        method: 'post',
        data
    })
}