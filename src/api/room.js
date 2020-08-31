import request from '@/utils/request'
const BASE_ROOM_API_PATH = '/api/services/app/Room'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * 所有居家设施
 */
export function LoadAllBaseSupportings(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/LoadAllBaseSupportings',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * 所有清洗用品
 */
export function LoadAllBathSupportings(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/LoadAllBathSupportings',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * 所有厨房用品
 */
export function LoadAllKitchenSupportings(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/LoadAllKitchenSupportings',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * 所有周边配套
 */
export function LoadAllCheckInSupportings(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/LoadAllCheckInSupportings',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * 所有娱乐设施
 */
export function LoadAllEntertainmentSupportings(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/LoadAllEntertainmentSupportings',
        headers: headers,
        method: 'POST',
        data
    })
}

/**
 * 获取指定客房在指定日期范围内的定价
 */
export function GetPrices(data) {
    return request({
        url: BASE_ROOM_API_PATH + '/GetPrices',
        headers: headers,
        method: 'get',
        params: data
    })
}