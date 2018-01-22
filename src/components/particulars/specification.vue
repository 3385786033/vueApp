<template>
  <div class="spaecification-main-zhb">
    <div class="spaecifca-cont-zhb">
      <header class="spaecifca-head-zhb">
        <a href="javascript:;"><img :src="imgsurl" alt="" ref="ClassImgs"></a>
        <div class="spaecifca-mesage-zhb">
          <p>${{ curPiar.current_price }}</p>
          <p>Please select model</p>
        </div>
        <i class="spaecifca-colse-zhb" @click="colosebtn"></i>
      </header>
      <div class="variety" v-for="(varietys,index) in classGoods" :key="index">
        <p>{{ varietys.spec_name }}</p>
        <ul>
          <li v-for="(listlis,index) in varietys.spec_list" @click="selectSize($event)" :key="index" :data-url="listlis.prop_img">{{listlis.prop_val}}</li>
        </ul>
      </div>
      <div class="Number">
        <p>NUMBER</p>
        <div class="btnNumber">
          <input type="button" @click="addNumbers">
          <input v-model="num" class="InputText-zhb">
          <input type="button" @click="subtract">
        </div>
      </div>
      <footer class="spaecifca-foot-zhb">
        <router-link to="/download" class="spaecifca-addCart">ADD TO CART</router-link>
        <router-link to="/download" class="buy-immedia">BUY NOW</router-link>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'specification',
    data () {
      return {
        num: 1,
        sizelist: [],
        variety: {},
        imgsurl:this.curPiar.goods_image
      }
    },
    methods: {
      colosebtn: function () {
        this.$emit('selectgs',false)
      },
      addNumbers: function () {
        this.num++
      },
      subtract: function () {
        if (this.num <= 1) {
          this.num = 1
        } else {
          this.num--
        }
      },
      selectSize: function (e) {
        let self = e.target
        let arrImgs = []
        this.imgsurl = self.getAttribute('data-url')
        arrImgs.push(this.imgsurl)
        if (this.imgsurl == '') {
          this.imgsurl = arrImgs[0]
        }else {
          arrImgs.splice(0,1,arrImgs[0])
        }
        let nodes = self.parentElement.childNodes
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].className = ''
          self.className = 'selectChima'
        }
      }
    },
    created () {
      this.$nextTick(function () {
       // console.log(this.curPiar)
      })
    },
    props: ['classGoods','curPiar']
  }
</script>
<style scoped>
  .spaecification-main-zhb{
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    z-index: 11;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .spaecifca-cont-zhb{
    height: 9.6rem;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar{
    width: .1rem;
  }
  .spaecifca-head-zhb{
    height: 2rem;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: .2rem;
    padding-left: .2rem;
  }
  .spaecifca-head-zhb a{
    float: left;
    height: 100%;
    width: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }
  .spaecifca-head-zhb a img{
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }
  .spaecifca-mesage-zhb{
    height: 100%;
    width: auto;
    float: left;
    margin-left: .2rem;
    overflow: hidden;
  }
  .spaecifca-mesage-zhb p:first-child{
    font-size: .48rem;
    color: #bca56f;
    margin-top: .6rem;
  }
  .spaecifca-mesage-zhb p:last-child{
    font-size: .24rem;
    color: #999999;
    margin-top: .2rem;
  }
  .spaecifca-colse-zhb{
    float: right;
    width: .27rem;
    height: .27rem;
    background-image: url("../../assets/icon/close@2x.png");
    background-position: center;
    background-size: .27rem .27rem;
    background-repeat: no-repeat;
    margin-right: .2rem;
  }
  .variety{
    margin-top: .35rem;
    width: 100%;
    height: auto;
    overflow: auto;
    margin-left: .2rem;
  }
  .variety p{
    font-size: .24rem;
  }
  .variety ul{
    overflow: auto;
    /*height: 100%;*/
    margin-top: .2rem;
    margin-left: .2rem;
  }
  .variety ul li{
    float: left;
    box-sizing: border-box;
    padding: .1rem .4rem;
    color: #adadad;
    background-color: #dedede;
    font-size: .24rem;
    margin-left: .2rem;
    margin-top: .15rem;
  }
  .selectChima{
    background-color: #bca56f!important;
    color: #fff!important;
  }
  .Number{
    width: 100%;
    box-sizing: border-box;
    padding-left: .2rem;
    overflow: hidden;
    height: auto;
    margin-top: .2rem;
    margin-bottom: 1.2rem;
  }
  .Number p{
    font-size: .24rem;
    float: left;
  }
  .btnNumber{
    height: 0.36rem;
    line-height: .36rem;
    float: right;
    overflow: hidden;
  }
  .btnNumber input[type='button']{
    width: .36rem;
    height: .36rem;
    border-radius: 50%;
    text-align: center;
    outline: none;
    background-color: #fff;
    color: #aaa;
    border: none;
    float: left;
  }
  .btnNumber input[type='button']:first-child{
    background-image: url("../../assets/icon/add@2x.png");
    background-repeat: no-repeat;
    background-size: .36rem .36rem;
    background-position: center;
  }
  .btnNumber input[type='button']:last-child{
    background-image: url("../../assets/icon/reduce@2x.png");
    background-repeat: no-repeat;
    background-size: .36rem .36rem;
    background-position: center;
  }
  .btnNumber .InputText-zhb{
    width: .7rem;
    border: none;
    height: .36rem;
    text-align: center;
    line-height: .36rem;
    float: left;
  }
  .spaecifca-foot-zhb{
    height: auto;
    position: fixed;
    width: 100%;
    overflow: hidden;
    bottom: 0;
  }
  .spaecifca-addCart,.buy-immedia{
    width: 50%;
    box-sizing: border-box;
    outline: none;
    height: 1rem;
    background-color: #bca56f;
    border: none;
    color: #fff;
    font-size: .3rem;
    text-align: center;
    line-height: 1rem;
    float: left;
  }
  .buy-immedia{
    background-color: #333;
  }
</style>
