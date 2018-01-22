<template>
  <div class="share_mask" id="share_mask">
    <section class="share_mian">
      <p class="share_title">share</p>
      <nav class="bdsharebuttonbox share_nav" data-tag="share_1">
        <!--<a href="https://twitter.com/share" id="searchTw">-->
          <!--<img src="../../assets/images/twitter@2x.png" alt="">-->
          <!--<p >Twitter</p>-->
        <!--</a>-->
        <!--<a href="javascript:;" @click="shareFacebook">-->
          <!--<img src="../../assets/images/facebook@2x.png" alt="">-->
          <!--<p >Facebook</p>-->
        <!--</a>-->
        <!--<a href="javascript:;">-->
          <!--<img src="../../assets/images/ins@2x.png" alt="">-->
          <!--<p >Instagram</p>-->
        <!--</a>-->
        <a href="javascript:;" class="popup_twi" data-cmd="twi">
          <p >Twitter</p>
        </a>
        <a href="javascript:;" class="popup_fbook" data-cmd="fbook">
          <p >Facebook</p>
        </a>
      </nav>
      <input type="button" class="share_close" @click="shareColse($event)">
    </section>
  </div>
</template>
<script>
  export default {
    name: 'share',
    data () {
      return {

      }
    },
    methods: {
      shareFacebook: function () {
      },
      shareColse: function (e) {
         this.$emit('colseChek', false)
      }
    },
    mounted (){
      setTimeout(()=>{
        window._bd_share_config = {
          "common": {
            "bdSnsKey": {},
            "bdText": "有一款宝贝推荐给你",
            "bdMini": "2",
            "bdMiniList": false,
            "bdStyle": "0",
            "bdSize": "64"
          },
          "share": {},
          image: [{
            viewType: 'list',
            viewPos: 'top',
            viewColor: 'white',
            viewSize: '64',
            viewList: ['twi', 'fbook']
          }],
          selectShare: [{
            "bdselectMiniList": ['twi', 'fbook']
          }]
        };
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)
        document.body.appendChild(s)
      },20)
    }
  }
</script>
<style scoped>
  .share_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 11;
    background-color: rgba(0,0,0,.5);
  }
  .share_mian{
    height: 3.8rem;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  .share_title{
    width: 100%;
    margin: .35rem 0 .2rem 0;
    text-align: center;
    font-size: .22rem;
  }
  .share_mian nav{
    width: 100%;
    box-sizing: border-box;
    padding-left: .7rem;
    margin-bottom: .1rem;
    overflow: hidden;
  }
  .share_nav a{
    margin: 0;
    display: block;
    width: 1.5rem;
    height: 1.7rem;
    margin-left: .9rem;
    box-sizing: border-box;
    float: left;
    overflow: hidden;
  }
  .share_nav a{
    padding-left: 0!important;
  }
  .popup_twi,.popup_fbook{
    background-image: url("../../assets/images/twitter@2x.png")!important;
    background-size: 1.2rem 1.2rem;
    background-position:top center;
    background-repeat: no-repeat;
  }
  .popup_fbook{
    background-image: url("../../assets/images/facebook@2x.png")!important;
    background-position:top center;
    background-size: 1.2rem 1.2rem;
  }
  .share_nav a p{
    margin-top: 1.3rem;
    text-align: center;
    font-size: .22rem;
  }
  .share_nav p{

  }
  .share_nav a img{
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    border: none;
  }
  .share_close{
    width: .28rem;
    height: .28rem;
    outline: none;
    background-size: .28rem .28rem;
    background-color: #fff;
    border: none;
    background-image: url("../../assets/icon/close@2x.png");
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
