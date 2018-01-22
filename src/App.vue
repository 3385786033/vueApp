<template>
  <div id="app">
    <div v-if="isShow" class="download">
      <span @click="change(false)" class="close"></span>
      <img src="./assets/icon/icon@2x.png" alt="">
      <div class="describe">
        <p class="ft-28">TUBATULU</p>
        <p class="ft-24">Find It In The App Store</p>
      </div>
      <a @click="openApp" :href="downloadLink" class="get">GET</a>
    </div>
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive"></router-view>    
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      // isShow:true,
      downloadLink:'javascript:;'
    }
  },
  computed:{
    isShow(){
      return this.$store.state.isShow
    }
  },
  methods : {
    openApp() {
      if(window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
        window.location.href = 'https://www.hlpacific.com'
        setTimeout (()=>{
          window.location.href = 'https://itunes.apple.com/cn/app/tubatulu/id1331327255?mt=8'
          this.isShow = false
        },2000)
      }
      if(window.navigator.userAgent.match(/android/i)){
        window.location.href = "OPENTUBATULU://"
        setTimeout (()=>{
          window.location.href = 'https://play.google.com/store/apps/details?id=com.slt.itaobao'
          this.isShow = false
        },2000)
      }
    },
    ...mapMutations(['change'])
  },
}
</script>

<style lang="scss" scoped>

  .ft-24 {
    font-size: 0.24rem;
  }
  .ft-28 {
    font-size: 0.28rem;
  }
  .download {
    position: relative;
    height: 1rem;
    padding-left: 1.7rem;
    border-bottom:0.01rem solid #f0f0f0;
    .close {
      position: absolute;
      left: 0.32rem;
      top: 50%;
      transform: translateY(-50%);    
      width: 0.26rem;
      height: 0.27rem;
      background-image: url("./assets/icon/close@2x.png");
      background-repeat: no-repeat;
      background-size: 0.26rem 0.26rem;
    }
    img {
      position: absolute;
      left: 0.74rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.78rem;
      height: 0.78rem;
    }
    .describe {
      position: absolute;
      top:50%;
      transform: translateY(-50%);
    }
    .get {
      position: absolute;
      top:50%;
      right:0.4rem;
      transform: translateY(-50%);
      width: 1rem;
      height: 0.54rem;
      border: solid 0.01rem #333333;
      font-size: 0.28rem;
      line-height: 0.54rem;
      text-align: center;
    }
  }
</style>
