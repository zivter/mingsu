import { GetShareParams } from '@/api/tokenAuth'
import wx from 'weixin-js-sdk'

const tokenId = window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : ''

let share = {
    share(title, pic, content) {
        const param = {
            url: window.location.href
        }
        GetShareParams(param).then((result) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx99caf7662870d79d', // 必填，公众号的唯一标识
                timestamp: result.result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.result.noncestr, // 必填，生成签名的随机串
                signature: result.result.signature, // 必填，签名
                jsApiList: [
                        "updateAppMessageShareData", //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                        "updateTimelineShareData", //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                    ] // 必填，需要使用的JS接口列表
            });
        }).catch((err) => {

        });
        wx.ready(function() {
            wx.updateAppMessageShareData({
                title: '浙拾光民宿预订-' + title, // 分享标题
                desc: content ? content : '优质民宿，星级保洁，管家服务。', // 分享描述
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: pic ? pic : 'https://www.shigvg77.cn/h5/logo.png', // 分享图标
                success: function() {
                    // 设置成功
                }
            })
            wx.updateTimelineShareData({
                    title: '浙拾光民宿预订-' + title, // 分享标题
                    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pic ? pic : 'https://www.shigvg77.cn/h5/logo.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });

        wx.error(function(res) {
            //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    },
    
    share2(title, pic, content) {
        const param = {
            url: window.location.href
        }
        GetShareParams(param).then((result) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx99caf7662870d79d', // 必填，公众号的唯一标识
                timestamp: result.result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.result.noncestr, // 必填，生成签名的随机串
                signature: result.result.signature, // 必填，签名
                jsApiList: [
                        "updateAppMessageShareData", //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                        "updateTimelineShareData", //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                    ] // 必填，需要使用的JS接口列表
            });
        }).catch((err) => {

        });
        wx.ready(function() {
            wx.updateAppMessageShareData({
                title: '浙拾光民宿预订-' + title, // 分享标题
                desc: content ? content : '优质民宿，星级保洁，管家服务。', // 分享描述
                link: window.location.href+'&ctag='+tokenId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: pic ? pic : 'https://www.shigvg77.cn/h5/logo.png', // 分享图标
                success: function() {
                    // 设置成功
                }
            })
            wx.updateTimelineShareData({
                    title: '浙拾光民宿预订-' + title, // 分享标题
                    link: window.location.href+'&ctag='+tokenId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pic ? pic : 'https://www.shigvg77.cn/h5/logo.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });

        wx.error(function(res) {
            //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }
}

export default share