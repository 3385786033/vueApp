<template>
  <header class="parHead-zhb" ref="myParhead">
    <i class="parHead-back-zhb" @click="banck_btn"></i>
    <nav class="parHead-nav-zhb">
      <a href="javascript:;" @click="shangping" class="a_color" data-tab="to1">goods</a>
      <a href="javascript:;" @click="estimate" data-tab="to1=2">reviews</a>
      <a href="javascript:;" @click="part" data-tab="to1=3">details</a>
    </nav>
    <!--<i class="collect" @click="addCollect($event)"></i>-->
    <i class="par_share" @click="parShare"></i>
  </header>
</template>

<script>
  export default {
    name: 'particularsHead',
    data () {
      return {
        showCollect: false
      }
    },
    methods: {
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let nine = document.querySelector('.parHead-zhb');
        let offsetH = nine.offsetHeight
        if(scrollTop>offsetH){
          nine.style.position = 'fixed';
          nine.style.top = 0;
        }else{
          nine.style.position = 'relative';
        }
      },
      // addCollect: function (e) {
      //   const Collect = e.target
      //   if (this.showCollect === false) {
      //     Collect.className='collect setbg'
      //     this.showCollect = true
      //   } else {
      //     Collect.className='collect getbg'
      //     this.showCollect = false
      //   }
      // },
      parShare: function () {
        this.$emit('listenToc', true)
      },
      estimate: function (e) {
        let navs = e.target.parentElement.childNodes
        for (let i = 0; i < navs.length; i++) {
          navs[i].className = ''
          e.target.className = 'a_color'
        }
        var estimate = document.getElementById('sd')
        //alert(estimate.offsetTop)
        estimate.scrollIntoView(true)
      },
      part: function (e) {
        let navs = e.target.parentElement.childNodes
        for (let i = 0; i < navs.length; i++) {
          navs[i].className = ''
          e.target.className = 'a_color'
        }
        let details = document.getElementsByClassName('noevaluationStart')[0]
        details.scrollIntoView(true)
      },
      shangping: function (e) {
        let navs = e.target.parentElement.childNodes
        for (let i = 0; i < navs.length; i++) {
          navs[i].className = ''
          e.target.className = 'a_color'
        }
        let shangping = document.getElementById('shangping')
        shangping.scrollIntoView(false)
      },
      banck_btn: function () {
        this.$router.go(-1)
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
<style scoped>
  a:link{
    text-decoration: none;
  }
  .parHead-zhb{
    height: 1rem;
    width: 100%;
    box-sizing: border-box;
    border: 0.01rem solid #dddddd;
    position: relative;
    top:0;
    z-index: 10;
    background-color: #fff;
  }
  .parHead-back-zhb{
    float: left;
    width: .2rem;
    height: .34rem;
    background-image: url("../../assets/icon/back@2x.png");
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: .2rem .34rem;
    margin-top: .25rem;
    margin-left: .3rem;
    margin-right: 1.2rem;
  }
  .parHead-nav-zhb{
    width: 4.8rem;
    height: 100%;
    line-height: .9rem;
    float: left;
    opacity: 1;
  }
  .parHead-nav-zhb a{
    /*margin-right: .4rem;*/
    margin-left: .2rem;
    font-size: .28rem;
  }
  .parHead-nav-zhb a:first-child{
    margin-left: 0;
  }
  .a_color{
    color: #bca56f;
  }
  .collect{
    float: left;
    width: .34rem;
    height: .34rem;
    background-image: url("../../assets/icon/collection@2x.png");
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: .34rem .34rem;
    margin-top: .3rem;
    margin-left: 1rem;
  }
  .setbg{
    background-image: url("../../assets/icon/collection_2@2x.png") !important;
  }
  .getbg{
    background-image: url("../../assets/icon/collection@2x.png") !important;
  }
  .par_share{
    float: left;
    width: .34rem;
    height: .34rem;
    background-image: url("../../assets/icon/share@2x.png");
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: .34rem .34rem;
    margin-top: .31rem;
    margin-left: .2rem;
    box-sizing: border-box;
  }
</style>
