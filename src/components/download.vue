<template>
  <div class="all">
    <div class="bg">
      <img src="../assets/images/bg@2x.png" alt="">
    </div>
    <h1 class="logo">
      <router-link to="/">
        <img src="../assets/icon/icon@2x.png" alt="">
      </router-link>
    </h1>
    <p>YOUR NEW</p>
    <p>ONLINE SHOPPING</p>
    <p>CHOICE</p>
    <p>IN SINGAPORE.</p>
    <a :href="downloadLink" @click="openApp" class="download-link">GET THE APP</a>
    <router-link class="link-web" to="/">Stay in browsing mobile website</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      downloadLink:'javascript:;'
    }
  },
  methods: {
    openApp() {
      if(window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
        window.location.href = 'OPENTUBATULU://'
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
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .all {
    width: 100%;
    color:#fff;
    text-align: center;
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: -100;
    img {
      width: 100%;
    }
    
  }
  .logo {
    padding-top: 1rem;
    margin-bottom: 0.4rem;
  }
  .download-link {
    display: block;
    margin-left:auto;
    margin-right: auto;
    margin-top: 4.6rem;
    width: 3.68rem;
    height: 0.72rem;
    line-height: 0.72rem;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .link-web {
    position: relative;
    display: block;
    color: #FFF;
    margin-top: 0.2rem;
    margin-left:auto;
    margin-right: auto;
    font-size: 0.24rem;
    line-height: 0.18rem;
    &::after {
      content:'';
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      width: 0.16rem;
      height: 0.16rem;
      background-image: url(../assets/icon/in@2x.png);
      background-repeat:no-repeat;
      background-size: 0.16rem 0.16rem 
    }
  } 
</style>

