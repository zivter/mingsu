import request from '@/utils/request'
const UserToken = window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : ''
const headears = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'UserToken': UserToken
}

/**
 * 10.会员资金流水列表
 */
export function flowList(data) {
    return request({
        url: '/flow/h5/list',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 11.提现信息新增
 */
export function addExtract(data) {
    return request({
        url: '/extract/h5/add',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 12.提现信息列表
 */
export function extractList(data) {
    return request({
        url: '/extract/h5/list',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 13.会员报名列表
 */
export function enrollList(data) {
    return request({
        url: '/enroll/h5/list',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 14.查询报名信息
 */
export function enrollInfo(data) {
    return request({
        url: '/enroll/h5/info',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 15.新增报名信息
 */
export function addEnroll(data) {
    return request({
        url: '/enroll/h5/add',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 15.报名删除
 */
export function delEnroll(data) {
    return request({
        url: '/enroll/h5/delete',
        headers: headears,
        method: 'post',
        params: data
    })
}