import Vue from 'vue'
import Vuex from 'vuex'
import tokenAuth from './modules/tokenAuth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    tokenAuth,
  },
  strict: debug,
})