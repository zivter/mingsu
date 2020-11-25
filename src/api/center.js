import request from '@/utils/request'
const UserToken = window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : ''
const tokenId = window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : ''
const headears = {
    'Content-Type': 'application/x-www-from-urlencoded',
    'UserToken': tokenId
}
/**
 * 3.反馈信息新增
 */
export function addFeedback(data) {
    return request({
        url: '/tow/feedback/h5/add',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 4.会员福利列表
 */
export function welfareList(data) {
    return request({
        url: '/tow/welfare/h5/list',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 5.查询会员福利信息
 */
export function welfareInfo(data) {
    return request({
        url: '/tow/welfare/h5/info',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 6.会员消息列表
 */
export function messageList(data) {
    return request({
        url: '/tow/message/h5/list',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 7.查询会员消息
 */
export function messageInfo(data) {
    return request({
        url: '/tow/message/h5/info',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 8.会员消息状态修改为已读
 */
export function messageEdit(data) {
    return request({
        url: '/tow/message/h5/edit',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 9.会员消息删除
 */
export function messageDelete(data) {
    return request({
        url: '/tow/message/h5/delete',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 16.查询账户信息
 */
export function accountInfo(data) {
    return request({
        url: '/tow/account/h5/info',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 17.查询账户主页几项金额汇总
 */
export function accountUnified(data) {
    return request({
        url: '/tow/account/h5/unified',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 18.编辑账户信息
 */
export function accountEdit(data) {
    return request({
        url: '/tow/account/h5/edit',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 19.新增会员扫码记录（推广）
 */
export function addScanning(data) {
    return request({
        url: '/tow/scanning/h5/add',
        headers: headears,
        method: 'post',
        params: data
    })
}

/**
 * 35.获取推广二维码图片
 */
export function advertScanning(data) {
    return request({
        url: '/scanning/h5/advert',
        headers: headears,
        method: 'post',
        params: data
    })
}
