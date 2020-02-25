import request from '@/utils/request'
const BASE_CATEGORY_API_PATH = '/api/services/app/CategoryQuery'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * H5获取完整位置分类
 */
export function getAllCategory(data) {
    return request({
        url: BASE_CATEGORY_API_PATH + '/GetAll',
        headers: headers,
        method: 'get',
        data
    })
}