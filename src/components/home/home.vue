<template>
  <div class="home" id="homeZHB">
    <div v-if="iscouponShow" class="coupon">
      <div class="coupon-enter">
        <img class="ribbon-top" src="../../assets/images/ribbon_1@2x.png" alt="">
        <a @click="handleHideCoupon" class="enter" href="javascript:;">ENTER</a>
        <img class="ribbon-bottom" src="../../assets/images/ribbon_2@2x.png" alt="">
      </div>
    </div>
    <header class="home-head-zhb">
      <router-link :to="{name:'category'}" class="icosan_zhb"></router-link>
      <input
        type="text"
        placeholder="SEARCH"
        class='head-search-zhb'
        @click="sheachs">
      <!--<div class="head-message-zhb">-->
        <!--<div class="mesg-no"v-if="nesgStar"></div>-->
      <!--</div>-->
    </header>
    <div class="home-Main-zhb">
      <!--轮播-->
      <layout :data-banner="banners"></layout>
        <nav class="home-navList-zhb">
      <router-link :to="{name:'commodity',params:{id:item.cat_id}}" v-for="(item,index) in items" :key="index">
        <img v-lazy="item.cat_image">
        <p>{{ item.cat_name_en }}</p>
      </router-link>
    </nav>
    <!--end-->
    <!--限时购-->
      <LimitShop></LimitShop>
    <!--end-->

    <div class="home-ListMain-zhb" v-for="(items,index) in listMian" :key="index">
      <h1 class="ListMain-title-zhb">{{ index | filReplace }}</h1>
      <ul class="ListMain-ul-zhb">
        <li v-for="(Listcom,index) in items" :key="index" >
          <router-link :to="{ name:'particulars',params:{id:Listcom.goods_id}}">
            <img v-lazy="Listcom.goods_image" alt="">
          </router-link>
          <p class="ListMain-txt-zhb"><a href="javascript:;">{{ Listcom.goods_name_en }}</a></p>
          <p class="ListMain-price-zhb"><i>$</i>{{ Listcom.origin_price }}</p>
        </li>
      </ul>
    </div>
  </div>
  <a @click="handleOpenService" href="javascript:;" class="home-service"></a>
  </div>
</template>
<script>
  import LimitShop from '@/components/home/LimitShop'
  import layout from '@/components/carousel_zhb/layout'
  import parson from '../../assets/js/parson'
  import {mapMutations} from 'vuex'
  export default {
    name: 'home',
    data () {
      return {
        iscouponShow:false,
        nesgStar: true,
        items: [],
        listComsity: [],
        listMian: [],
        titles: [],
        banners: []
      }
    },
    methods: {
      sheachs: function () {
        this.$router.push('/searchGoods')
      },
      getCoupon: function () {
        if(this.$route.query && this.$route.query.act == 'price'){
          this.iscouponShow = true;
        }
      },
      handleOpenService() {
        $zopim(function() {
          $zopim.livechat.window.show()
        })
      },
      handleHideCoupon(){
        this.iscouponShow = false;
      }
    },
    components: {LimitShop, layout},
    filters:{
      filReplace (value) {
        if(value == 'daily_updates'){
          return 'DAILY UPDATES'
        }
        if(value == 'popular_right_now'){
          return 'Popular Now'
        }
    }
    },
    created () {
      this.getCoupon()
      this.$nextTick(function () {
        this.$axios.get('/home').then ((response) =>{
          let obj1 = new parson.getUrlprson(response,'banner','banner_image')
          this.banners = obj1.showbanner()
          let navvigas = new parson.getUrlprson(response,'navigation')
          this.items = navvigas.navigation()
          let nowList = new parson.getUrlprson(response,'now')
          this.listMian = nowList.nows()
        })
      })
    },
    // beforeRouteLeave (to,from,next) {
    //   let top = window.scrollY
    //   this.$store.commit('getHomeScrollTop',top)
    //   next()
    // },
    // mounted () {
    //   console.log(document.body.scrollHeight)
    // }
  }
</script>
<style scoped>
  @import "home.css";
  ::-webkit-input-placeholder{
    font-size: .28rem;
  }
  a:active,a:link,a:visited,a:hover{
    text-decoration: none;
  }
  .home-service {
    position: fixed;
    right: 0.2rem;
    bottom: 0.4rem;
    background-image:url(../../assets/icon/home_service@2x.png);
    width: 1rem;
    height: 1rem;
    background-repeat: no-repeat;
    background-size: 1rem 1rem;
    z-index: 999;
  }
  .coupon {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .2);
    z-index: 1000;
  }
  .coupon-enter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 5.56rem;
    height: 7.56rem;
    background-image: url(../../assets/images/coupon@2x.png);
    background-repeat: no-repeat;
    background-size: 5.56rem 7.56rem;
  }
  .enter {
    position: absolute;
    bottom: 0.92rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 1.8rem;
    height: 0.56rem;
    background-color: #dbbc85;
    line-height: 0.56rem;
    color: #fff;
  }
  .ribbon-top {
    position: absolute;
    top: -1.22rem;
    left: -1rem;
    width: 1.82rem;
  }
  .ribbon-bottom {
    position: absolute;
    bottom: -0.96rem;
    right: -1.26rem;
    width: 3.25rem;

  }
</style>

