import request from '@/utils/request'
const BASE_CLEANING_API_PATH = '/api/services/app/CleaningReserve'
const headers = window.localStorage.getItem('accessToken') ? { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') } : {}

/**
 * H5 保洁预约
 */
export function CleaningReserveApply(data) {
    return request({
        url: BASE_CLEANING_API_PATH + '/Apply',
        headers: headers,
        method: 'POST',
        data
    })
}