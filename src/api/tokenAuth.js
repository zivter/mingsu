import request from '@/utils/request'
const BASE_TOKEN_API_PATH = '/api/TokenAuth'

/**
 * 微信认证地址
 */
export function WechatH5Auth(page_url) {
    let targetUrl = encodeURIComponent(page_url || window.location.href)
    let options = {}
    options.targetUrl = targetUrl
    const url = 'https://www.shigvg77.cn/api/TokenAuth/WechatH5Auth' + '?' + parseDataToParam(options)
    window.location.href = url
}

function parseDataToParam(data, comma = '&') {
    let f_str = JSON.stringify(data);
    f_str = f_str.split("\"").join('');
    f_str = f_str.split(" ").join('');
    f_str = f_str.replace("{", "").replace("}", "");
    f_str = f_str.split(':').join('=').split(',').sort().join(comma);

    return f_str
}

/**
 * 微信认证回调
 */
export function WechatH5AuthCallback() {
    return request({
        url: BASE_TOKEN_API_PATH + '/WechatH5AuthCallback',
        method: 'get'
    })
}

/**
 * 微信认证cb
 */
export function ExternalAuthenticate(data) {
    return request({
        url: BASE_TOKEN_API_PATH + '/ExternalAuthenticate',
        method: 'POST',
        data
    })
}

/**
 * 微信绑定
 */
export function WechatH5Bind(data) {
    return request({
        url: BASE_TOKEN_API_PATH + '/WechatH5Bind',
        method: 'POST',
        data
    })
}

/**
 * 微信绑定
 */
export function GetShareParams(data) {
    return request({
        url: BASE_TOKEN_API_PATH + '/GetShareParams',
        method: 'GET',
        params: data
    })
}