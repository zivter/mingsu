import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import 'vant/lib/icon/local.css';
import './icons/iconfont.css'
import './icons/iconfont.js'
import axios from 'axios'
import VueRouter from 'vue-router'
import store from './store'
import global_ from './components/global'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(Vant);
Vue.use(VueRouter)
Vue.use(InfiniteLoading, {
    props: {
        spinner: 'default',
    },
});
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
// Vue.prototype.url = 'https://www.shigvg77.cn/h5/index.html#/'
    // Vue.prototype.url = 'http://192.168.31.160:8089/#/'
    // Vue.prototype.url = 'http://172.22.18.56:8089/#/'
    Vue.prototype.url = 'http://localhost:8089/#'

new Vue({
    store,
    render: h => h(App),
    router,
    VueRouter
}).$mount('#app')