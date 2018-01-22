<template>
<div class="particulars-cont-zhb">
  <div class="loadin" v-show="Showloagin">
    <img src="../../assets/images/loadin1.gif" alt="">
  </div>
  <div class="particulars-head-zhb">
    <div class="particularsHead-zhb">
      <particularsHeads @listenToc="showShare">

      </particularsHeads>
    </div>
  </div>
    <section class="particulars-mesg-zhb">
      <div class="carousel">
        <layout v-bind:data-banner="dataList"></layout>
      </div>
      <a href="javascript:;" class="parti-txt-zhb">{{ dataGoodsinfo.goods_name_en }}</a>
      <p class="particulars-pric-zhb">${{dataGoodsinfo.current_price}}</p>
    </section>
    <!--规格-->
    <div class="part-spec-zhb">
      <div class="par-div-zhb">
        <span class="spec-activ">Fee</span>
        <span class="spec-text">${{dataGoodsinfo.shipping_fee}}</span>
      </div>
      <div class="par-div-zhb" @click="selectSpecif" id="sd">
        <span class="spec-activ">Choose</span>
        <span class="spec-text">Size</span>
        <i class="extend-zhb"></i>
      </div>
    </div>
      <!--选择规格-->
      <spaecifications
        v-if="spaecifStatr"
        v-on:selectgs="showSeleGs"
        :class-goods="classGoods"
        :cur-piar="cuspar">
      </spaecifications>
  <!--end-->
  <!--商品评价-->
  <div class="partMesae-main-zhb">
    <header class="partMesae-head-zhb" id="estimate">REVIEWS(<span>{{ partMesaeNumber }}</span>)</header>
    <section class="partMesae-cont-zhb" v-if="evaluationStart">
      <div class="user-main-zhb">
        <div class="LeftImg-zhb"><img :src="evaluations.avatar" alt=""></div>
        <div class="Right-msg-zhb">
          <p class="user-name-zhb">{{ evaluations.nick_name }}</p>
          <p class="user-date-zhb">{{ evaluations.create_date }}</p>
        </div>
      </div>
      <p class="particulars-message-zhb">{{ evaluations.content }}</p>
      <ul class="particulars-ul-zhb">
        <li v-for="(itns,index) in evaluations.image_list" :key="index"><img :src="itns" alt=""></li>
      </ul>
      <footer class="partMesae-foot-zhb">
        <p class="foot-model-zhb">SIZE: <i>{{evaluations.goods_prop}}</i></p>
        <div class="praise">
          <i @click="btn_praise($event)"></i><span>{{ evaluations.like_num }}</span>
        </div>
      </footer>
      <a href="javascript:;" class="more_evaluate" @click="more_evaluate">LOOK MORE REVIEWS ></a>
    </section>
    <div class="noevaluationStart" v-else>
      There was no comment on the item.
    </div>
  </div>
  <!--end-->

  <!--商品详情-->
  <commoditys
    :commod-imgs="infoImgs"
  ></commoditys>
  <!--end-->
  <!--猜你喜欢-->
  <div class="like-zhb">
    <div class="like-title">
      <div class="linetitle-zhb">
      <h1>YOU MAY LIKE</h1>
      </div>
    </div>
    <ul class="like-list-zhb">
      <li v-for="(likeList,index) in likeListNum" :key="index">
        <a @click='handleRefresh(likeList.goods_id)' href="javascript:;" class="likeList-img-zhb">
          <img :src="likeList.goods_image" alt="">
        </a>
        <a href="javascript:;" class="likeList-mesg-zhb">{{ likeList.goods_name }}</a>
        <p class="likeList-prc-zhb">${{ likeList.origin_price}}</p>
      </li>
    </ul>
  </div>
  <!--分享-->
  <shares
    v-show="showStat"
    @colseChek="showShareto"
  ></shares>
  <div class="particulars-foot-zhb">
    <a @touchstart="handleOpenChat" href="javascript:;" class="service-zhb">
      <img src="../../assets/icon/cs@2x.png" alt="">
      <p>service</p>
    </a>
    <router-link to="/download" class="Cart-zhb">
      <img src='../../assets/icon/cart@2x.png' alt="">
      <p>cart</p>
    </router-link>
    <router-link to="/download" @click="addCart" class="addCart">ADD TO CART</router-link>
    <router-link to="/download" @click="purchase" class="purchase">BUY NOW</router-link>
  </div>
</div>
</template>
<script>
  import particularsHeads from '@/components/particulars/particularsHead'
  import layout from '@/components/carousel_zhb/layout'
  import shares from '@/components/classCommodity/share'
  import commoditys from '@/components/particulars/commodity'
  import spaecifications from '@/components/particulars/specification'
  import parson from '../../assets/js/parson'
  export default {
    name: 'particulars',
    data () {
      return {
        evaluationStart:false,
        showStat: false,
        partMesaeNumber: '',
        showPraise: false,
        praiseNum: 25,
        spaecifStatr: false,
        showCart: false,
        Showloagin:true,
        cuspar:[],
        likeListNum: [],
        dataList: [],
        dataGoodsinfo: [],
        classGoods:[],
        infoImgs: [],
        evaluations: []
      }
    },
    components: {
      particularsHeads, shares, layout, commoditys, spaecifications
    },
    methods: {
      selectSpecif: function () {
        this.spaecifStatr = true
      },
      btn_praise: function (e) {
        const praise = e.target
        if (this.showPraise === false) {
          praise.style.backgroundImage = 'url("../../assets/icon/zan_1@2x.png")'
          this.praiseNum++
          this.showPraise = true
        } else {
          praise.style.backgroundImage = 'url("../../assets/icon/zan@2x.png")'
          this.praiseNum--
          this.showPraise = false
        }
      },
      more_evaluate: function () {

      },
      addCart: function () {
        // this.nocarBg = this.carBg
      },
      purchase: function () {

      },
      listenTo: function (someData) {

      },
      showShare: function (data) {
        this.showStat = data
      },
      showShareto: function (data) {
        this.showStat = data
      },
      showSeleGs: function (data) {
        this.spaecifStatr = data
      },
      handleRefresh(id) {
        this.Showloagin = true
        this.$axios.get('/product',{params:{goods_id:id}}).then((response) =>{
         if(response.status == 200){
           this.Showloagin = false
         }
         //console.log(response)
            //banner
            let goodsbanners = new parson.getUrlprson(response,'goods_images','image_url')
            this.dataList = goodsbanners.showbanner()
            //en_name
            let goodsbanners_name = new parson.getUrlprson(response,'goods_info')
            this.dataGoodsinfo = goodsbanners_name.nows()
            //规格
            this.cuspar = this.dataGoodsinfo
            //goodsclas
            let classgoods = new parson.getUrlprson(response,'goods_prop');
            this.classGoods = classgoods.navigation()
            //imgs
            this.infoImgs = goodsbanners_name.nows()
            //评价
            let evaluation =  new parson.getUrlprson(response,'goods_comment')
            this.partMesaeNumber = evaluation.nows().goods_count
            if (evaluation.nows().goods_count === 0) {
              this.evaluationStart = false
            }else {
              this.evaluationStart = true
              this.evaluations = evaluation.nows()
            }
            //推荐商品
            let goods_recommend = new parson.getUrlprson(response,'goods_recommend')
            this.likeListNum = goods_recommend.nows()
            this.Showloagin = false

        }).catch(function (err) {console.log(err)})
      },
      handleOpenChat (){
        $zopim(function() {
          $zopim.livechat.window.show()
        })
        // $zopim(function() {
        //   $zopim.livechat.button.show();
        // })
      }
    },
    updated: function () {
      window.scrollTo(0,0)
    },
    created () {
      this.$nextTick(function () {
        let goods_id = this.$route.params.id
        this.$axios.get('/product',{params:{goods_id:goods_id}}).then((response) =>{
         // console.log(response)
          if(response.status == 200){
            this.Showloagin = false
          }
          if(response.data.status == -1) {
             // alert('系统错误')
          }else {
            //banner
            let goodsbanners = new parson.getUrlprson(response,'goods_images','image_url')
            this.dataList = goodsbanners.showbanner()
            //en_name
            let goodsbanners_name = new parson.getUrlprson(response,'goods_info')
            this.dataGoodsinfo = goodsbanners_name.nows()
            //规格
            this.cuspar = this.dataGoodsinfo
            //goodsclas
            let classgoods = new parson.getUrlprson(response,'goods_prop');
            this.classGoods = classgoods.navigation()
            //imgs
            this.infoImgs = goodsbanners_name.nows()
            //评价
            let evaluation =  new parson.getUrlprson(response,'goods_comment')
            this.partMesaeNumber = evaluation.nows().goods_count
            //console.log(response)
            if (evaluation.nows().goods_count === 0) {
              this.evaluationStart = false
            }else {
              this.evaluationStart = true
              this.evaluations = evaluation.nows()
            }
            //推荐商品
            let goods_recommend = new parson.getUrlprson(response,'goods_recommend')
            this.likeListNum = goods_recommend.nows()
          }
        }).catch(function (err) {console.log(err)})
      })
    }
  }
</script>
<style>
  @import "particulars.css";
</style>
