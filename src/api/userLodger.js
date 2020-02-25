import request from '@/utils/request'
const BASE_USERLODGER_API_PATH = '/api/services/app/UserLodger'
const headers = window.localStorage.getItem('accessToken') ? {Authorization : 'Bearer ' + window.localStorage.getItem('accessToken')} : {}

/**
 * 【H5】获取入住人详情
 */
export function GetUserLodger(data) {
  return request({
    url: BASE_USERLODGER_API_PATH + '/Get',
    headers: headers,
    method: 'get',
    params: data
  })
}

/**
 * 【H5】新建入住人信息
 */
export function CreateUserLodger(data) {
  return request({
    url: BASE_USERLODGER_API_PATH + '/Create',
    headers: headers,
    method: 'post',
    data
  })
}

/**
 * 【H5】更新入住人信息
 */
export function UpdateUserLodger(data) {
  return request({
    url: BASE_USERLODGER_API_PATH + '/Update',
    headers: headers,
    method: 'put',
    data
  })
}

/**
 * 【H5】删除入住人信息
 */
export function DeleteUserLodger(data) {
  return request({
    url: BASE_USERLODGER_API_PATH + '/Delete',
    headers: headers,
    method: 'delete',
    params: data
  })
}

/**
 * 【H5】获取所有入住人信息
 */
export function GetAllUserLodger(data) {
  return request({
    url: BASE_USERLODGER_API_PATH + '/GetAll',
    headers: headers,
    method: 'get',
    params: data
  })
}
