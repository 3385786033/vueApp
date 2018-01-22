import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShow:true,
  scrollTop:0
}

const mutations = {
  change (state,arg) {
    this.state.isShow = arg
  },
  // 记录滚动位置
  getHomeScrollTop (state,arg) {
    this.state.scrollTop = arg
  }
}
export default new Vuex.Store({
  state,
  mutations
})