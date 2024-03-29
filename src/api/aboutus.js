import request from '@/utils/request'
const UserToken = window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : ''

/**
 * 1.文章获取
 */
export function getArticle(data) {
    return request({
        url: '/tow/article/h5/info',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'UserToken': UserToken
        },
        method: 'post',
        params: data
    })
}

/**
 * 2.合作信息新增
 */
export function addCollaborate(data) {
    return request({
        url: '/tow/collaborate/h5/add',
        headers: {
            'Content-Type': 'application/x-www-from-urlencoded',
            'UserToken': UserToken
        },
        method: 'post',
        params: data
    })
}
