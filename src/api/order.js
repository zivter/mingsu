import request from '@/utils/request'
const BASE_ORDER_API_PATH = '/api/services/app/Order'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

const tokenId = window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : ''
const headearss = {
    'Content-Type': 'application/x-www-from-urlencoded',
    'UserToken': tokenId
}

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

/**
 * 22.新增会员订单
 */
export function addOrder(data) {
    return request({
        url: '/tow/order/h5/add',
        headers: headearss,
        method: 'post',
        params: data
    })
}

/**
 * 23.取消会员订单
 */
export function editOrder(data) {
    return request({
        url: '/tow/order/h5/edit',
        headers: headearss,
        method: 'post',
        params: data
    })
}

/**
 * 24.查询订单信息
 */
export function orderInfo(data) {
    return request({
        url: '/tow/order/h5/info',
        headers: headearss,
        method: 'post',
        params: data
    })
}

/**
 * 26.订单列表查询
 */
export function orderInfoList(data) {
  return request({
      url: '/tow/order/h5/list',
      headers: headearss,
      method: 'post',
      params: data
  })
}

/*
 * 27.账单列表
 */
export function billList(data) {
    return request({
        url: '/tow/bill/h5/list',
        headers: headearss,
        method: 'post',
        params: data
    })
}

/*
 * 27.订单的第一个账单查询
 */
export function billFirst(data) {
    return request({
        url: '/tow/bill/h5/first',
        headers: headearss,
        method: 'post',
        params: data
    })
}
/**
 * 31.调用账单付款
 */
export function orderBill(data) {
    return request({
        url: '/tow/bill/h5/orderBill',
        headers: headearss,
        method: 'post',
        params: data
    })
  }
  
  