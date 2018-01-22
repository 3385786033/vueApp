<template>
  <div class="nine-wdx">
    <div class="nine-title">
      <a href="javaScript:;" @click="handleGoBack"><img src="../assets/icon/back@2x.png" alt=""></a>
      <p>$9.90 SUPER DEALS</p>
    </div>
    <!-- banner -->
    <div class="banner"><img src="../assets/images/snap_banner.png" alt=""></div>

    <!-- 9.9元区商品展示 -->
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <router-link :to="{name:'particulars',params:{id:item.goods_id}}">
          <img v-lazy="item.goods_image" alt="">
          <p class="goods-name">{{item.goods_name}}</p>
          <p class="price">
              <span><i>$</i>{{item.current_price}}</span>
              <del><i>$</i>{{item.origin_price}}</del>
          </p>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>


<script>
  export default {
    data () {
        return {
            list:[]
        }
    },
    created () {
      this.$axios.post('/activity/limit_money')
        .then((response)=>{
          this.list = response.data.data.limit_money.list
      })
    },
    methods: {
      handleGoBack() {
        this.$router.go(-1)
      },
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let nine = document.querySelector('.nine-title');
        let activ = document.querySelector('.nine-wdx');
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
      window.addEventListener('scroll', this.handleScroll);
    },
    // 离开该页面时，移除监听  防止报错
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="scss">
  .nine-wdx{
    // padding-top: .88rem;
    box-sizing: border-box;
  }
  .nine-title {
    width: 100%;
    height: 1rem;
    display: flex;
    font-size: .34rem;
    justify-content: center;
    align-items: center;
    background: #FFF;
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
    height: 2.54rem;

    img{
      width: 100%;
      height: 100%;
    }
  }

  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .08rem;
    margin-top: .20rem;

    li{
      width: 3.60rem;
      height: 5.10rem;
      border: 0.01rem solid #dadada;
      margin-bottom: .10rem;
      
      a{
        display: block;
      }

      img{
        width: 100%;
        height: 3.60rem;
        display: block;
      }
      p.goods-name{
        font-size: .28rem;
        padding: 0 .14rem;
        box-sizing: border-box;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        width: 100%;
        height: .9rem;
      }
      p.price{
        text-align: center;

        span{
          font-size: .32rem;
          color: #bca56f;

          i{font-size: .20rem; }
        }
        del{
          font-size: .22rem;
          color: #999;
          margin-left: .16rem;
        }
      }
    }
  }


</style>
