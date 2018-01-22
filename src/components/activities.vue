<template>
  <div class="activities">
      <div class="activities-title">
        <a href="javaScript:;" @click="handleGoBack" ><img src="../assets/icon/back@2x.png" alt=""></a>
        <p>FLASH SALES</p>
      </div>
      <!-- banner -->
      <div class="banner">
        <img src="../assets/images/flash_sale_background.png" alt="">
        <div class="time-limit">
          <p class="remaining-time">REMAINING TIME</p>
          <p class="time">
            <span class="hour">{{timeh}}</span><i>:</i><span class="minute">{{timem}}</span><i>:</i><span class="second">{{times}}</span>
          </p>
        </div>
      </div>

      <!-- 限时商品展示区 -->
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <router-link :to="{name:'particulars',params:{id:item.goods_id}}">
            <div class="time-pic">
              <img v-lazy="item.goods_image" alt="">
              <p class="sale">SALE</p>
            </div>
            <div class="time-cont">
              <p class="time-goods-name">{{item.goods_name}}</p>
              <div class="goods-price">
                <p class="price">
                  <span class="current_price"><i>$</i>{{item.current_price}}</span>
                  <del class="origin_price"><i>$</i>{{item.origin_price}}</del>
                </p>
                <p class="buy-now">BUY NOW</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
  import parson from '../assets/js/parson'
  export default {
    data () {
      return {
        list:[],
        dateTims:'',
        timeh: '00',
        timem: '00',
        times: '00'
      }
    },
    created () {
      this.countTime()
      this.$axios.get('/activity/limit_time')
      .then((response)=>{
        this.list = response.data.data.limit_time.list
        let times = new parson.getUrlprson(response,'limit_time')
        let josns = times.nows()
        this.dateTims = josns.details.effective_time
      })
    },
    methods: {
      handleGoBack() {
        this.$router.go(-1)
      },
      countTime () {
        setInterval(function () {
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
      },
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let nine = document.querySelector('.activities-title');
        let activ = document.querySelector('.activities');
        let offsetH = nine.offsetHeight
        if(scrollTop>offsetH){
          nine.style.position = 'fixed';
          nine.style.top = 0;
          activ.style.paddingTop = 1 + 'rem'
        }else{
          nine.style.position = 'relative';
          activ.style.paddingTop = 0 + 'rem'
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
    },
    // 离开该页面时，移除监听  防止报错
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="scss">
  .activities{
    position: relative;
    background: #f0f0f0;
    // padding-top: .88rem;
    box-sizing: border-box;

    .activities-title{
      width: 100%;
      height: 1rem;
      display: flex;
      font-size: .34rem;
      justify-content: center;
      align-items: center;
      background: #FFF;
      // position: fixed;
      // top: 0;
      // left: 0;
      z-index: 1;
      border-bottom: 0.01rem solid #dadada;

      a{
        position: absolute;
        width: .18rem;
        height: .32rem;
        left: .33rem;
        display: flex;

        img{
          width: .18rem;
          height: .32rem;
        }
      }
    }

    .banner{
      width: 100%;
      height: auto;
      background: #FFF;
      display: flex;
      flex-direction: column;

      img{
        width: 100%;
        height: 2.54rem;
      }

      .time-limit{
        height: .80rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        p.remaining-time{
          font-size: .28rem;
          color: #333;
          margin-right: .12rem;
        }

        p.time{
          font-size: .22rem;
          display: flex;
          align-items: center;

          span{
            width: .36rem;
            height: .42rem;
            background: #333;
            color: #FFF;
            display: inline-block;
            text-align: center;
            line-height: .42rem;
          }

          i{
            font-size: .36rem;
            color: #333;
            margin: 0 .12rem;
          }
        }
      }
    }

    ul{
      margin-top: .10rem;
      background: #FFF;

      li{
        a{
          width: 100%;
          padding: 0 .20rem;
          box-sizing: border-box;
          display: flex;
          border-bottom: .01rem solid #f0f0f0;
          justify-content: space-between;
          align-items: center;
        }

        .time-pic{
          width: 2.10rem;
          height: 2.10rem;
          padding: .30rem 0;
          position: relative;
          img{
            width: 2.10rem;
            height: 2.10rem;
          }
          p.sale{
            width: .70rem;
            height: .36rem;
            text-align: center;
            line-height: .36rem;
            background: rgba(215, 40, 45, 0.5);
            font-size: .22rem;
            color: #FFF;
            position: absolute;
            right: 0;
            top: .30rem;
          }
        }

        .time-cont{
          width: 4.63rem;
          height: 2.10rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          p.time-goods-name{
            font-size: .28rem;
            color: #333;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
            width: 100%;
            height: .9rem;
          }

          .goods-price{
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            p.price{
              display: flex;
              flex-direction: column;

              span.current_price{
                font-size: .32rem;
                color: #d7282d;

                i{
                  font-size: .20rem;
                }
              }

              del.origin_price{
                font-size: .22rem;
                color: #999;
              }
            }

            p.buy-now{
              width: 1.52rem;
              height: .52rem;
              background: #333;
              text-align: center;
              line-height: .52rem;
              font-size: .28rem;
              color: #FFF;
            }
          }
        }
      }
    }
  }
</style>
