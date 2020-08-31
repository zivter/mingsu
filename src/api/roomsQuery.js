import request from '@/utils/request'
const BASE_ROOMSQUERY_API_PATH = '/api/services/app/RoomsQuery'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * 客房详情
 */
export function GetDetail(id) {
    return request({
        url: BASE_ROOMSQUERY_API_PATH + '/GetDetail',
        headers: headers,
        method: 'GET',
        params: {
            Id: id
        }
    })
}

/**
 * 指定客房在指定月份的可预订日期
 */
export function GetIdleDates(data) {
    return request({
        url: BASE_ROOMSQUERY_API_PATH + '/GetIdleDates',
        headers: headers,
        method: 'GET',
        params: data
    })
}

/**
 * 客房列表
 */
export function GetRoomList(data) {
    return request({
        url: BASE_ROOMSQUERY_API_PATH + '/GetRoomList',
        headers: headers,
        method: 'GET',
        params: data
    })
}

/**
 * H5 订单数量统计
 */
export function GetStatusCounts() {
    return request({
        url: BASE_ROOMSQUERY_API_PATH + '/GetStatusCounts',
        headers: headers,
        method: 'GET'
    })
}

/**
 * H5 指定客房在指定日期范围的可预订日期
 */
export function GetIdleDatesByDateRange(data) {
    return request({
        url: BASE_ROOMSQUERY_API_PATH + '/GetIdleDatesByDateRange',
        headers: headers,
        method: 'GET',
        params: data
    })
}

/**
 * 入离实见
 */
export function GetCommonSettings() {
    return request({
        url: '/api/services/app/Configuration/GetCommonSettings',
        headers: headers,
        method: 'GET'
    })
}