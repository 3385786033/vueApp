<template>
  <div class="classCommod-zhb">
    <header class="classCommod-head-zhb">
      <i class="classCommod-back-zhb" @click="back_zhb"></i>
      <h2 class="classCommod-title-zhb">Ladies Fashion</h2>
      <i class="classCommod-share-zhb" @click="share_zhb"></i>
    </header>
    <section class="classCommod-banner-zhb">
      <a href="javascript:;">
        <img v-lazy="bannerUrl">
      </a>
    </section>
    <div class="classCommod-listMesg-zhb">
      <ul @touchstart="btn_listmsg($event)">
        <li v-for="(item,index) in catList" :key="index"><a :data-catid='item.cat_id' href="javascript:;">{{ item.cat_name_en }}</a></li>
      </ul>
    </div>
    <div class="classCommod-filtrate-zhb">
      <input type="button" value="RECOMMEND">
      <div class="pric-filtrateBtn" @click="changeup">
          <span>price</span>
          <div class="screen_btn">
            <i class="up_btn"></i><i class="down_btn"></i>
          </div>
      </div>
      <input type="button" value="SENTIMENT" @click="popularity">
    </div>
    <div class="classCommod-productList-zhb">
      <ul>
        <li v-for="(item,index) in productList" :key="index">
          <router-link :to="{name:'particulars',params:{id:item.goods_id}}" class="classCommod-img-zhb"><img :src="item.goods_image" alt=""></router-link>
          <router-link :to="{name:'particulars',params:{id:item.goods_id}}" class="productList-des-zhb">{{item.goods_name}}</router-link>
          <p class="classCommod-pir">S${{item.current_price}}</p>
        </li>
      </ul>
    </div>
    <div>
      <shares v-show="raechStats" v-on:colseChek="CloseRaech">

      </shares>
    </div>
  </div>
</template>
<style scoped>
  @import "classCommodity.css";
</style>
<script>
  import shares from '@/components/classCommodity/share'
  export default {
    name: 'classCommodity',
    data () {
      return {
        raechStats: false,
        bannerUrl:'',
        catList: [],
        productList: [],
      }
    },
    methods: {
      back_zhb: function () {
        window.history.back()
      },
      share_zhb: function () {
        this.raechStats = true
      },
      btn_listmsg: function (event) {
        if(event.target.nodeName != 'A'){
          return
        }
        let aList = event.target.parentNode.parentNode.childNodes
        for (let i = 0; i < aList.length; i++) {
          aList[i].childNodes[0].className = ''
        }
        event.target.className = 'libgcolor'
        let cat_id = event.target.dataset.catid
        this.getProductList(cat_id)
      },
      changeup: function () {
        // alert('价格')
      },
      popularity: function () {
        // alert('人气')
      },
      shareColse: function (e) {

      },
      getProductList (id) {
        this.$axios.get("/products",{params:{cat_id:id}}).then(
          ({data:{data}})=>{
            this.catList = data.cat_list
            this.bannerUrl = data.cat_banner[0].image_url
            this.productList = data.goods_list
          }
        )
      },
      CloseRaech: function (data) {
        this.raechStats = data
      }
    },
    created () {
      this.getProductList(this.$route.params.id)
    },
    components: {
      shares
    },
    watch:{
      '$route'(){
        this.getProductList(this.$route.params.id)
      }
    }
  }
</script>
