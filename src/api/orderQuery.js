import request from '@/utils/request'
const BASE_ORDERQUERY_API_PATH = '/api/services/app/OrderQuery'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}


/**
 * H5 订单数量统计
 */
export function GetStatusCounts() {
    return request({
        url: BASE_ORDERQUERY_API_PATH + '/GetStatusCounts',
        headers: headers,
        method: 'GET'
    })
}

/**
 * H5订单列表
 */
export function GetAllOrderQuery(data) {
    return request({
        url: BASE_ORDERQUERY_API_PATH + '/GetAll',
        headers: headers,
        method: 'GET',
        params: {
            Keyword: data.Keyword,
            OrderStatus: data.OrderStatus,
            from: data.from,
            to: data.to,
            SkipCount: data.SkipCount,
            MaxResultCount: data.MaxResultCount
        }
    })
}

/**
 * H5订单详情
 */
export function GetOrderQuery() {
    return request({
        url: BASE_ORDERQUERY_API_PATH + '/GetAll',
        headers: headers,
        method: 'GET'
    })
}