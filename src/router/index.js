import Vue from "vue";
import Router from "vue-router";
import { WechatH5Auth, ExternalAuthenticate, GetShareParams } from '@/api/tokenAuth'
import { GetWechatProfile } from "@/api/account";
import { addScanning } from '@/api/center';
import store from '../store'
import Cookies from 'js-cookie'
import { Notify } from 'vant';
Vue.use(Notify);

Vue.use(Router);

const mingsuRouter = new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/home"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/views/detail/detail"),
      meta: {
        title: "客房详情",
      },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/order/order"),
      meta: {
        title: "订单填写",
      },
    },
    {
      path: "/ticket",
      name: "ticket",
      component: () => import("@/views/ticket/ticket"),
      meta: {
        title: "门票",
      },
    },
    {
      path: "/ticketDetail",
      name: "ticketDetail",
      component: () => import("@/views/ticket/ticketDetail"),
      meta: {
        title: "门票详情",
      },
    },
    {
      path: "/center",
      name: "center",
      component: () => import("@/views/center/center"),
      meta: {
        title: "个人中心",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/center/profile"),
      meta: {
        title: "个人资料",
      },
    },
    {
      path: "/orderCenter",
      name: "orderCenter",
      component: () => import("@/views/center/orderCenter"),
      meta: {
        title: "我的订单",
      },
    },
    {
      path: "/board/orderDetail",
      name: "board",
      component: () => import("@/views/board/orderDetail"),
      meta: {
        title: "确认订单",
      },
    },
    {
      path: "/orderDetail",
      name: "orderDetail",
      component: () => import("@/views/center/orderDetail"),
      meta: {
        title: "订单详情",
      },
    },
    {
      path: "/coupon",
      name: "coupon",
      component: () => import("@/views/center/coupon"),
      meta: {
        title: "优惠券",
      },
    },
    {
      path: "/purse",
      name: "purse",
      component: () => import("@/views/center/purse"),
      meta: {
        title: "钱包",
      },
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/views/center/withdraw"),
      meta: {
        title: "提现",
      },
    },
    {
      path: "/withdrawSuccess",
      name: "WithdrawSuccess",
      component: () => import("@/views/center/withdrawSuccess"),
      meta: {
        title: "提现成功",
      },
    },
    {
      path: "/withdrawHistory",
      name: "withdrawHistory",
      component: () => import("@/views/center/withdrawHistory"),
      meta: {
        title: "提现明细",
      },
    },
    {
      path: "/collect",
      name: "collect",
      component: () => import("@/views/center/collect"),
      meta: {
        title: "我的收藏",
      },
    },
    {
      path: "/occupant",
      name: "occupant",
      component: () => import("@/views/center/occupant"),
      meta: {
        title: "入住人信息",
      },
    },
    {
      path: "/checkInEditor",
      name: "checkInEditor",
      component: () => import("@/views/center/checkInEditor"),
    },
    {
      path: "/cleaning/index",
      name: "cleaning",
      component: () => import("@/views/cleaning/index"),
      meta: {
        title: "我的保洁单",
      },
    },
    {
      path: "/cleaning/submit",
      name: "submit",
      component: () => import("@/views/cleaning/submit"),
      meta: {
        title: "提交保洁单",
      },
    },
    {
      path: "/cleaning/cleaningSuccess",
      name: "cleaningSuccess",
      component: () => import("@/views/cleaning/cleaningSuccess"),
      meta: {
        title: "提交成功",
      },
    },
    {
      path: "/couponGet",
      name: "couponGet",
      component: () => import("@/views/coupon/index"),
      meta: {
        title: "领取优惠券",
      },
    },
    {
      path: "/serveRoot",
      name: "serveRoot",
      component: () => import("@/views/serveRoot/serveRoot"),
      meta: {
        title: "绑定微信",
      },
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: () => import("@/views/aboutUs/index"),
      meta: {
        title: "关于我们",
      },
    },
    {
      path: "/orderSuccess",
      name: "orderSuccess",
      component: () => import("@/views/order/orderSuccess"),
      meta: {
        title: "支付成功",
      },
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: () => import("@/views/center/feedback"),
      meta: {
        title: "问题与建议",
      },
    },
    {
      path: "/marketing",
      name: "Marketing",
      component: () => import("@/views/center/marketing"),
      meta: {
        title: "营销中心",
      },
    },
    {
      path: "/messageCenter",
      name: "MessageCenter",
      component: () => import("@/views/messageCenter/index"),
      meta: {
        title: "消息中心",
      },
    },
    {
      path: "/messageDetail",
      name: "MessageDetail",
      component: () => import("@/views/messageCenter/messageDetail"),
      meta: {
        title: "消息详情",
      },
    },
    {
      path: "/activityCenter",
      name: "ActivityCenter",
      component: () => import("@/views/activityCenter/index"),
      meta: {
        title: "活动中心",
      },
    },
    {
      path: "/activeDetail",
      name: "ActiveDetail",
      component: () => import("@/views/activityCenter/activeDetail"),
      meta: {
        title: "活动详情",
      },
    },
    {
      path: "/activeJoin",
      name: "ActiveJoin",
      component: () => import("@/views/activityCenter/activeJoin"),
      meta: {
        title: "活动详情",
      },
    },
    {
      path: "/myJoin",
      name: "MyJoin",
      component: () => import("@/views/activityCenter/myJoin"),
      meta: {
        title: "我的报名",
      },
    },
    {
      path: "/rentalList",
      name: "RentalList",
      component: () => import("@/views/center/rentalList"),
      meta: {
        title: "租房订单",
      },
    },
    {
      path: "/rentalOrderDetail",
      name: "RentalOrderDetail",
      component: () => import("@/views/center/rentalOrderDetail"),
      meta: {
        title: "租房订单详情",
      },
    },
    {
      path: "/rentHome",
      name: "RentHome",
      component: () => import("@/views/rentHome/index"),
      meta: {
        title: "租房首页",
      },
    },
    {
      path: "/rentDetail",
      name: "RentDetail",
      component: () => import("@/views/rentHome/detail"),
      meta: {
        title: "租房详情",
      },
    },
    {
      path: "/rentOrder",
      name: "RentOrder",
      component: () => import("@/views/rentHome/order"),
      meta: {
        title: "租房确认",
      },
    },
    {
      path: "/rentOrderSuccess",
      name: "RentOrderSuccess",
      component: () => import("@/views/rentHome/rentOrderSuccess"),
      meta: {
        title: "租房成功",
      },
    },
    // {
    //     path: '/cleaning',
    //     redirect: './cleaning/index',
    //     component: () =>
    //         import ('@/views/cleaning/index'),
    //     children: [{
    //             path: 'index',
    //             name: 'index',
    //             component: () =>
    //                 import ('@/views/cleaning/cleaning'),
    //             meta: {
    //                 title: '我的保洁单'
    //             }
    //         },
    //         {
    //             path: 'submit',
    //             name: 'submit',
    //             component: () =>
    //                 import ('@/views/cleaning/submit'),
    //             meta: {
    //                 title: '提交保洁单'
    //             }
    //         }
    //     ]
    // },
  ],
});

mingsuRouter.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if(to.query.superior) {
    window.localStorage.setItem('superior', to.query.superior);
  }
  tokenAuth.getAuth(to, next)
});

const tokenAuth = {
  //获取encryptedCode
  getWechatH5Auth(urlDirect) {
    const url = urlDirect ? urlDirect : ''
    WechatH5Auth(Vue.prototype.url + url)
  },

  //微信认证cb
  ExternalAuthenticate(encryptedCode) {
    const param = {
      "authProvider": "WechatH5",
      "providerKey": new Date().getTime(),
      "providerAccessCode": encryptedCode
    }
    ExternalAuthenticate(param).then((result) => {
      result.result.recordTime = new Date().getTime(); //记录时间
      store.dispatch('tokenAuth/setToken', result.result)
      location.reload()
      next();
    }).catch((err) => {
      Notify({ type: 'danger', message: err })
    });
  },
  /**
   * 获取个人信息
   */
  GetWechatProfile() {
    GetWechatProfile().then((result) => {
      store.dispatch('tokenAuth/setTokenId', result.result.userId).then(res => {
        if(window.localStorage.getItem('superior')) {
          tokenAuth.addScanning()
        }
      }).catch( err => {
        console.log(err);
      })
      
    })
    .catch((err) => {
      Notify({ type: 'danger', message: err })
    });
  },
  /** 调用营销中心的接口 */
  addScanning(){
    const param = {
      superior: window.localStorage.getItem('superior')
    }
    addScanning(param).then((result) => {
      if(result.msg == '请不要尝试自己扫自己！') {
        Notify({ type: 'danger', message: result.msg })
      }
      window.localStorage.removeItem('superior')
    }).catch((err) => {
      Notify({ type: 'danger', message: err })
    });
  },
  /** 获取token */
  getAuth(to, next) {
    const that = this;
    tokenAuth.GetWechatProfile()
    if (to.query.ctag) {
      Cookies.set('ctag', to.query.ctag, { expires: 1 })
    }
    store.dispatch('tokenAuth/getAuth', {
      exist: function(token) {
        next();
      },
      none: function() {
        if (to.query.encryptedCode) {
          tokenAuth.ExternalAuthenticate(to.query.encryptedCode)
        } else {
          tokenAuth.getWechatH5Auth(to.fullPath)
        }
      }
    })
  }
}

export default mingsuRouter;
