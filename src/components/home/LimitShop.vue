<template>
  <div class="Limitshop-zhb">
    <div class="Limitshop-head-zhb">
      <p>LIMITED TIME SALE</p>
      <div class="tirem-zhb">
        <span id="_h">{{ timeh }}</span><span>:</span><span id="_m">{{ timem }}</span><span>:</span><span id="_s">{{ times }}</span>
      </div>
      <router-link to="/activities" class="more-zhb" @click="limitTime">MORE ></router-link>
    </div>
    <!--限时商品-->
    <div class="Limitshop-list-zhb swiper-container">
      <swiper class="swiper-wrapper" :options="swiperOption"  ref="mySwiper">
        <swiper-slide v-for="swipeTime in hostList" class="swiper-slide" :key="swipeTime.id">
          <router-link :to="{ name:'particulars',params:{id:swipeTime.goods_id}}">
            <img v-lazy="swipeTime.goods_image" alt="">
            <div class="tips">SALE</div>
          </router-link>
          <p class="Limitshop-mesage-zhb">{{ swipeTime.goods_name }}</p>
          <div class="Limitshop-pirce-zhb">
            <span class="init_pirce">${{ swipeTime.current_price }}</span><del class="del_price">${{ swipeTime.origin_price}}</del>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!--end-->
    <!--9.9商品-->
    <div class="special-pirce-zhb">
       <header class="special-head-zhb">
         <i></i>
         <p class="spec-msg-zhb">$9.90 SUPER DEALS</p>
         <router-link to="/nine" class="spec-btn-zhb">MORE ></router-link>
       </header>
      <ul class="spec-lists-zhb">
        <li v-for="(specList,index) in lists" :key="index">
          <router-link :to="{ name:'particulars',params:{id:specList.goods_id}}">
            <img v-lazy="specList.goods_image" alt="">
            <p class="spec-lists_msg-zhb">{{ specList.goods_name}}</p>
            <p class="spec-lists_pirc-zhb">
              <span>${{ specList.current_price }}</span>
              <del>${{  specList.origin_price }}</del>
            </p>
          </router-link>
        </li>
      </ul>
      <a class="spec-listspir_btn-zhb" @click="Sales">MORE ></a>
    </div>
    <!--end-->
  </div>
</template>
<style scoped>
  .Limitshop-zhb{
    height: auto;
    width: 100%;
    overflow: hidden;
    margin-top: .1rem;
    box-sizing: border-box;
    padding-bottom: .1rem;
  }
  .Limitshop-head-zhb{
    height: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: .2rem;
    background-color: #fff;
  }
  .Limitshop-head-zhb p{
    font-size: .34rem;
    margin-top: .36rem;
    float: left;
  }
  .tirem-zhb{
    float: left;
    height: 100%;
    box-sizing: border-box;
    padding-top: .4rem;
    margin-left: .4rem;
  }
  .tirem-zhb span{
    display: block;
    float: left;
    box-sizing: border-box;
    font-size: .22rem;
  }
  #_h,#_m,#_s{
    color: #fff;
    background-color: #333333;
    min-width: .4rem;
    height: .4rem;
    padding: .05rem;
    box-sizing: border-box;
    text-align: center;
    margin:0 .05rem;
    border-radius: .05rem;
    line-height: .3rem;
  }
  .more-zhb{
    margin-top: .5rem;
    float: right;
    background-color: #fff;
    color: #aaa;
    margin-right: .2rem;
    font-size: .24rem;
    border: none;
    outline: none;
  }
  /*限价商品列表头*/
  .Limitshop-list-zhb{
    width: 100%;
    height: 3.6rem;
    box-sizing: border-box;
    overflow: hidden;
    padding:0 .1rem;
    background-color: #fff;
    padding-bottom: .2rem;
  }
  .Limitshop-list-zhb ul{
    overflow: hidden;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .Limitshop-list-zhb ul li{
    height: 100%;
    width: 2.2rem;
    box-sizing: border-box;
    border: 0.01rem solid #dddddd;
    overflow: hidden;
    float: left;
    margin-left: .25rem;
  }
  .swiper-slide{
    height: 100%;
    box-sizing: border-box;
    border: 0.01rem solid #dddddd;
    overflow: hidden;
    float: left;
  }

  .swiper-slide a{
    width: 100%;
    height: 2.2rem;
    display: block;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }
  .swiper-slide a img{
    display: block;
    border: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .tips{
    position: absolute;
    top: .1rem;
    right: 0;
    height: .3rem;
    width: .75rem;
    background-color: #e1676a;
    color: #fff;
    font-size: .24rem;
    text-align: center;
    line-height: .3rem;
  }
  .Limitshop-mesage-zhb{
    font-size: .24rem;
    height: .50rem;
    margin: 0 .1rem;
    margin-top: .1rem;
    line-height: .25rem;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    -webkit-line-clamp:2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .Limitshop-pirce-zhb{
    width: 100%;
    text-align: center;
  }
  .Limitshop-pirce-zhb span{
    display: inline-block;
  }
  .init_pirce{
    color: #d7282d;
    font-size: .24rem;
  }
  .del_price{
    color: #999999;
    font-size: .2rem;
    margin-left: .1rem;
  }
</style>
<style scoped>
  .special-pirce-zhb{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    overflow: hidden;
    margin-top: .1rem;
    background-color: #fff;
    padding-top: .3rem;
    text-align: center;
  }
  .special-head-zhb{
    width: 100%;
    height: 1.1rem;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: .2rem;
    padding-top: .25rem;
  }
  .special-head-zhb i{
    float: left;
    height: .42rem;
    width: 0.06rem;
    margin-top: .05rem;
    background-color: black;
  }
  .spec-msg-zhb{
    font-size: .34rem;
    color: #333;
    float: left;
    padding-left: .4rem;
    box-sizing: border-box;
  }
  .spec-btn-zhb{
    float: right;
    margin-right: .2rem;
    font-size: .24rem;
    color: #aaa;
    margin-top: .1rem;
  }
  /*9.9特价商品*/
  .spec-lists-zhb{
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  .spec-lists-zhb li{
    width: 3.6rem;
    height: 5.1rem;
    box-sizing: border-box;
    overflow: hidden;
    float: left;
    margin-top: .1rem;
    margin-left: .1rem;
    border: 0.01rem solid #dddddd;
  }
  .spec-lists-zhb li a{
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .spec-lists-zhb li a img{
    width: 100%;
    height: 3.6rem;
    display: block;
    overflow: hidden;
    border: none;
    box-sizing: border-box;
  }
  .spec-lists_msg-zhb{
    font-size: .28rem;
    color: #333;
    margin-top: .2rem;
    box-sizing: border-box;
    height: .75rem;
    padding: 0 .1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    -webkit-line-clamp:2;
    display: -webkit-box;
    line-height: .35rem;
    -webkit-box-orient: vertical;
  }
  .spec-lists_pirc-zhb{
    width: 100%;
    text-align: center;
  }
  .spec-lists_pirc-zhb span:first-child{
    color: #d7282d;
    font-size: .32rem;
  }
  .spec-lists_pirc-zhb del{
    font-size: .24rem;
    color: #999999;
  }
  .spec-listspir_btn-zhb{
    position: relative;
    box-sizing:border-box;
    display: inline-block;
    height: .72rem;
    width: 2.64rem;
    outline: none;
    /* background-color: #333; */
    border: 0.01rem solid #dedede;
    color: #333;
    text-align: center;
    line-height: .72rem;
    font-size: .24rem;
    margin: .2rem;
  }
  /* .spec-listspir_btn-zhb::after {
    content:'';
    position: absolute;
    top:50%;
    transform:translateY(-50%);
    right:0.7rem;
    width:0.11rem;
    height: 0.21rem;
    background-image:url(../../assets/icon/type_in@2x.png);
    background-repeat:no-repeat;
    background-size:0.11rem 0.21rem;
  } */
  /*end*/

</style>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import parson from '../../assets/js/parson'
  export default {
    name: 'LimitShop',
    data () {
      return {
        timeh: '00',
        timem: '00',
        times: '00',
        hostList: [],
        lists: [],
        dateTims:'',
        swiperOption: {
          notNextTick: true,
          loopedSlides: 3,
          slidesPerView: 3,
          spaceBetween:5,
          loop:true
        }
      }
    },
    methods: {
      limitTime: function () {
       this.$router.push('/activities')
      },
      Sales: function () {
        this.$router.push('/nine')
      },
      countTime () {
        setInterval(function () {
           //let date = new Date()
           //let now = date.getTime()
           //let endDate = new Date('2018/1/8 23:23:23')
           //let end = endDate.getTime()
           //let leftTime = end - now
          let _this = this
          let leftTime = _this.dateTims
          _this.dateTims--
          let d, h, m, s
          if (leftTime >= 0) {
            d = Math.floor(leftTime / 60 / 60 / 24)
            h = Math.floor(leftTime / 60 / 60 % 24)
            h = h + d * 24
            m = Math.floor(leftTime / 60 % 60)
            s = Math.floor(leftTime % 60)
          }
          if(h<=9){h = '0' + h}
          if(m<=9){m = '0' + m}
          if(s<=9){s = '0' + s}
          this.timeh = h
          this.timem = m
          this.times = s
        }.bind(this), 1000)
      }
    },
    created: function () {
      this.$nextTick(function () {
        //限时时间戳
        this.$axios.get('/activity/limit_time').then((response) =>{
          let times = new parson.getUrlprson(response,'limit_time')
          let josns = times.nows()
          this.dateTims = josns.details.effective_time
          this.countTime()
        })
        this.$axios.get('/activity/limit_money').then ((response) =>{
          let limt_moneuy = new parson.getUrlprson(response,'limit_money')
          this.lists = limt_moneuy.dates.list
        })
        this.$axios.get('/activity/limit_time').then ((response) =>{
          let limt_time = new parson.getUrlprson(response,'limit_time')
          this.hostList = limt_time.dates.list
        }).catch(function (err) {
          console.log(err)
        })
      })
    }
  }
</script>
