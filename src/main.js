// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import store from './store/store'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import VueTouch from 'vue-touch'
import VueLazyLoad from 'vue-lazyload'
Vue.use(vueAwesomeSwiper)
Vue.use(IScrollView,IScroll)
Vue.use(VueTouch,{name:'v-touch'})
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})
import '../node_modules/swiper/dist/css/swiper.css'
axios.defaults.baseURL = 'http://m-api.tubatulu.com';
axios.interceptors.request.use(
  config => {
      config.data = qs.stringify(config.data)
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Accept': 'application/json',
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });


Vue.use(function(Vue){
  Vue.prototype.$axios = axios
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App }
})
