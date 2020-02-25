import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const mingsuRouter = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/views/home/home')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () =>
                import ('@/views/detail/detail')
        },
        {
            path: '/order',
            name: 'order',
            component: () =>
                import ('@/views/order/order'),
            meta: {
                title: '订单填写'
            }
        },
        {
            path: '/ticket',
            name: 'ticket',
            component: () =>
                import ('@/views/ticket/ticket'),
            meta: {
                title: '门票'
            }
        },
        {
            path: '/ticketDetail',
            name: 'ticketDetail',
            component: () =>
                import ('@/views/ticket/ticketDetail'),
            meta: {
                title: '门票详情'
            }
        },
        {
            path: '/center',
            name: 'center',
            component: () =>
                import ('@/views/center/center'),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import ('@/views/center/profile'),
            meta: {
                title: '个人资料'
            }
        },
        {
            path: '/orderCenter',
            name: 'orderCenter',
            component: () =>
                import ('@/views/center/orderCenter'),
            meta: {
                title: '我的订单'
            }
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: () =>
                import ('@/views/center/coupon'),
            meta: {
                title: '优惠券'
            }
        },
        {
            path: '/collect',
            name: 'collect',
            component: () =>
                import ('@/views/center/collect'),
            meta: {
                title: '我的收藏'
            }
        },
        {
            path: '/occupant',
            name: 'occupant',
            component: () =>
                import ('@/views/center/occupant'),
            meta: {
                title: '入住人信息'
            }
        },
        {
            path: '/checkInEditor',
            name: 'checkInEditor',
            component: () =>
                import ('@/views/center/checkInEditor')
        },
        {
            path: '/cleaning/index',
            name: 'cleaning',
            component: () =>
                import ('@/views/cleaning/index'),
            meta: {
                title: '我的保洁单'
            }
        },
        {
            path: '/cleaning/submit',
            name: 'submit',
            component: () =>
                import ('@/views/cleaning/submit'),
            meta: {
                title: '提交保洁单'
            }
        },
        {
            path: '/cleaning/cleaningSuccess',
            name: 'cleaningSuccess',
            component: () =>
                import ('@/views/cleaning/cleaningSuccess'),
            meta: {
                title: '提交成功'
            }
        },
        {
            path: '/couponGet',
            name: 'couponGet',
            component: () =>
                import ('@/views/coupon/index'),
            meta: {
                title: '领取优惠券'
            }
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

    ]
})

mingsuRouter.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default mingsuRouter