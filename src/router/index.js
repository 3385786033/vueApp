import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Category from '@/components/category'
import Activities from '@/components/activities'
import Nine from '@/components/nine'
import Login from '@/components/login'
import Register from '@/components/register'
import Particulars from '@/components/particulars/particulars'
import Search from '@/components/searchGoods/serchgoodskong'
import Findpwd from '@/components/findpwd'
import Download from '@/components/download'
import Commodity from '@/components/classCommodity/classCommodity'
import AgreeMent from '@/components/agreeMent'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home,meta: {isKeepAlive: true}},
    {path: '/category',name: 'category',component: Category,meta: {isKeepAlive: true}},
    {path: '/activities',name: 'activities',component: Activities,meta: {isKeepAlive: true}},
    {path: '/nine',name: 'nine',component: Nine,meta: {isKeepAlive: true}},
    {path: '/login',name: 'login',component: Login,meta: {isKeepAlive: false}},
    {path: '/register',name: 'register',component: Register,meta: {isKeepAlive: false}},
    {path: '/particulars/:id',name: 'particulars',component: Particulars,meta: {isKeepAlive: false}},
    {path: '/searchGoods',name: 'search',component: Search,meta: {isKeepAlive: false}},
    {path: '/findpwd',name: 'findpwd',component: Findpwd,meta: {isKeepAlive: false}},
    {path: '/download',name: 'download',component: Download,meta: {isKeepAlive: false}},
    {path: '/commodity/:id',name:'commodity',component: Commodity,meta: {isKeepAlive: true}},
    {path: '/agreement', name:'agreement',component: AgreeMent,meta: {isKeepAlive: false}},
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }

})
