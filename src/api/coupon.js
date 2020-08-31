import request from '@/utils/request'
const BASE_COUPON_API_PATH = '/api/services/app'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * H5 领券接口
 */
export function takeCouponTaken(data) {
    return request({
        url: BASE_COUPON_API_PATH + '/CouponTaken/Take',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * H5 当前用户已领的优惠券
 */
export function GetMyCoupons(data) {
    return request({
        url: BASE_COUPON_API_PATH + '/CouponTakenQuery/GetMyCoupons',
        headers: headers,
        method: 'GET',
        params: data
    })
}

/**
 * H5 可领优惠券
 */
export function GetAvailableList(data) {
    return request({
        url: BASE_COUPON_API_PATH + '/CouponTemplateQuery/GetAvailableList',
        headers: headers,
        method: 'GET',
        params: data
    })
}

/**
 * H5 优惠券详情
 */
export function GetDetailCoupon(data) {
    return request({
        url: BASE_COUPON_API_PATH + '/CouponTemplateQuery/GetDetail',
        headers: headers,
        method: 'GET',
        params: data
    })
}