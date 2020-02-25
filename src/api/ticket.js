import request from '@/utils/request'
const BASE_TICKET_API_PATH = '/api/services/app/TouristAttractionQuery'
const headers = window.localStorage.getItem('accessToken') ? {Authorization : 'Bearer ' + window.localStorage.getItem('accessToken')} : {}

/**
 * 查询景点列表
 */
export function TouristAttractionQueryGetAll(data) {
  return request({
    url: BASE_TICKET_API_PATH + '/GetAll',
    headers: headers,
    method: 'get',
    params: data
  })
}

/**
 * 景点详情(门票)
 */
export function TouristAttractionQueryGetDetail(data) {
  return request({
    url: BASE_TICKET_API_PATH + '/GetDetail',
    headers: headers,
    method: 'get',
    params: data
  })
}
