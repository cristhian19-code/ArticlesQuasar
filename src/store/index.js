import Vue from 'vue'
import Vuex from 'vuex'
import Article from './Article'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    Article
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})


export default function (/* { ssrContext } */) {
  return Store
}

export { Store }
