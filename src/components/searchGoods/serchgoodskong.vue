<template>
  <div class="serchGoodskong">
    <header class="serchGoodskong-head-zhb">
      <form action="" @submit.prevent="getVal()">
        <input type="search" v-model="serchVal" placeholder="SEARCH" ref="searchs" >
      </form>
      <router-link to="/" class="backhome">
        CANCEL
      </router-link>
    </header>
    <section class="serchGoodsCont-zhb" v-if="type === 'E'">
      <div class="his_record">
        <div class="his_record-head">
          <span>History Search</span>
          <i @click="clears"></i>
        </div>
        <ul>
          <li v-for="(itms,index) in recordslist" :key="index" @click="seachsurl($event)">
            {{ itms.name }}
          </li>
        </ul>
      </div>
      <div class="host_search">
        <p>Top search</p>
        <ul>
          <li @click="seachsurl($event)">Link</li>
        </ul>
      </div>
    </section>
    <section class="searchGoods-list" v-if="type === 'A'">
      <ul>
        <li v-for="(itm,index) in Goodslist" :key="index">
          <router-link :to="{name:'particulars',params:{id:itm.goods_id}}">
            <img v-lazy="itm.goods_image" alt="">
          </router-link>
          <div class="listGoods-descr-zhb">
            <p class="listGoods-mesg-zhb">{{ itm.goods_name }}</p>
            <p class="listGoods-pri-zhb">${{ itm.current_price }}</p>
          </div>
        </li>
      </ul>
      <footer class="searchGoods-footer-zhb">
        It's oveR~
      </footer>
    </section>

    <!--没有商品-->
    <div class="No_searchGoods-zhb" v-else-if="type === 'B'">
      <img src="../../assets/icon/none@2x.png" alt="">
      <p>No merchandise was received~</p>
    </div>
    <!--加载失败-->
    <div class="lodErr-zhb" v-else-if="type === 'C'">
      <img src="../../assets/icon/failtoload@2x.png" alt="">
      <p>Load failed</p>
    </div>
    <!--服务器繁忙-->
    <div class="Servererr-zhb" v-else-if="type === 'D'">
      <img src="../../assets/icon/nodata@2x.png" alt="">
      <p>Server busy</p>
      <input type="button" value="刷新" @click="refresh_btn">
    </div>
  </div>
</template>
<script>
  import searchGoodstwo from '@/components/searchGoods/searchGoods'
  import store from '../../assets/js/store'
  import parson from '../../assets/js/parson'
  export default {
    name: 'serchgoodskong',
    data (){
      return {
        serchVal: '',
        serchList: [],
        arrs: [],
        type: 'E',
        staus: false,
        Goodslist: [],
        recordslist: store.fetch()
      }
    },
    created (){
      this.$nextTick(function () {
        this.$refs.searchs.focus()
      })
    },
    methods: {
      getVal (){
        if(this.serchVal == ''){

        }else {
          this.$axios.get('/products?key_words='+this.serchVal).then((response)=>{
            let listAS = new parson.getUrlprson(response,'goods_list')
            this.Goodslist = listAS.nows()
            if(this.Goodslist.length == 0){
              this.type = 'B'
            }else {
              this.type = 'A'
            }
             let _this = this
             _this.recordslist.unshift({ 'name': _this.serchVal })
             _this.serchVal = ''
          }).catch(function (err) {console.log(err)})
          this.staus = true
        }
        this.activeElement.blur()
      },
      clears: function () {
        this.recordslist.splice(0,this.recordslist.length)
        localStorage.clear()
      },
      seachsurl (e){
        let Restr = e.target.innerHTML
        let UrlRE = Restr.replace(/(^\s+)|(\s+$)/g,"")
        this.$axios.get('/products?key_words='+UrlRE).then((response)=>{
          let listAS = new parson.getUrlprson(response,'goods_list')
          this.Goodslist = listAS.nows()
          if(this.Goodslist.length == 0){
            this.type = 'B'
          }else {
            this.type = 'A'
          }
        })
      }
    },
    components:{searchGoodstwo},
    watch: {
      recordslist: {
        handler: function(val, oldVal) {
          store.save(val);
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped>

  @mixin Left{
    float: left;
  }
  @mixin Right{
    float: right;
  }
  @mixin WHeight{
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  @mixin ovflo_box{
    box-sizing: border-box;
    overflow: hidden;
  }
  @mixin inputNostyle{
    border: none;
    outline: none;
    display: block;
  }

  /*searchGoods-list*/
  .searchGoods-list{
    width: 100%;
    height: auto;
    overflow: hidden;
    padding:.2rem;
    box-sizing: border-box;
    background-color: #fff;
  }
  .searchGoods-list ul{
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .searchGoods-list ul li{
    height: 2.62rem;
    width: 100%;
    overflow: hidden;
    display: block;
    border-bottom: .01rem solid #eeeeee;
    border-top: .01rem solid #eeeeee;
    box-sizing: border-box;
    padding-top: .3rem;
    padding-bottom: .2rem;
  }
  .searchGoods-list ul li a{
    display: block;
    height: 2.1rem;
    width: 2.1rem;
    overflow: hidden;
    box-sizing: border-box;
    float: left;
  }
  .searchGoods-list ul li a img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .listGoods-descr-zhb{
    float: right;
    overflow: hidden;
  }
  .listGoods-descr-zhb .listGoods-mesg-zhb{
    width: 4.5rem;
    height: 1.5rem;
    font-size: .32rem;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .listGoods-pri-zhb{
    color: #bca56f;
    font-size: .32rem;
    box-sizing: border-box;
    padding-top: .2rem;
    overflow: hidden;
    white-space: nowrap;
  }
  .searchGoods-footer-zhb{
    height: .7rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    line-height: .7rem;
    font-size: .2rem;
    color: #333333;
    background-color: #eeeeee;
  }
  /*没搜索到商品*/
  .No_searchGoods-zhb,.lodErr-zhb,.Servererr-zhb{
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    text-align: center;
  }
  .No_searchGoods-zhb img,.lodErr-zhb img,.Servererr-zhb img{
    width: 2.4rem;
    height: 2.4rem;
    display: block;
    margin: 2rem auto .5rem auto;
  }
  .No_searchGoods-zhb p,.Servererr-zhb p,.lodErr-zhb p{
    font-size: .28rem;
    text-align: center;
    color: #999;
  }
  .Servererr-zhb input{
    width: 1.6rem;
    height: .57rem;
    border: 0.01rem solid #999999;
    outline: none;
    background-color: #fff;
    border-radius: .5rem;
    margin-top: .2rem;
    color: #999;
  }
  .serchGoodskong{
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    @include ovflo_box;
    .serchGoodskong-head-zhb{
      height: 1rem;
      width: 100%;
      padding-top: .2rem;
      background-color: #fff;
      border-bottom: 0.01rem solid #dddddd;
      font-size: 0.26rem;
      @include ovflo_box;
      form{
        width:81%;
        height: .56rem;
        float: left;
        @include ovflo_box;
        input{
          width: 97%;
          height: 100%;
          float: left;
          margin: 0 0 0 .2rem;
          padding-left: .8rem;
          /*line-height: .7rem;*/
          background-color: #eee;
          background-image: url("../../assets/icon/Magnifier@2x.png");
          background-repeat: no-repeat;
          background-size: .36rem .36rem;
          background-position: .1rem,-.01rem;
          @include inputNostyle;
        }
      }
      .backhome{
        height: 100%;
        width: 16%;
        text-align: center;
        line-height: .56rem;
        color: #888;
        font-size: .24rem;
        margin-right: .1rem;
        @include ovflo_box;
        @include Right;
      }
    }
    .serchGoodsCont-zhb{
      width: 100%;
      height: auto;
      @include ovflo_box;
      .his_record{
        width: 100%;
        height: 100%;
        margin-bottom: .1rem;
        background-color: #fff;
        @include ovflo_box;
        .his_record-head{
          width: 100%;
          height: .7rem;
          margin-top:0.2rem;
          padding-left: .2rem;
          @include ovflo_box;
          span{
            font-size: .28rem;
            @include Left;
            line-height: .7rem;
          }
          i{
            width: .32rem;
            height: .32rem;
            background-image:url("../../assets/icon/delete@2x.png") ;
            background-repeat: no-repeat;
            background-size: .32rem .32rem;
            margin-right: .2rem;
            margin-top: .2rem;
            @include Right
          }
        }
        ul{
          padding-left: .2rem;
          margin-bottom: .2rem;
          @include ovflo_box;
          li{
            width: auto;
            height: auto;
            border: 0.01rem solid #ddd;
            padding: .1rem .2rem;
            font-size: .28rem;
            list-style: none;
            border-radius: .1rem;
            margin-left: .1rem;
            margin-top: .1rem;
            @include ovflo_box;
            @include Left;
          }
          li:first-child{
            margin-left: 0;
          }
        }
      }
      .host_search{
        background-color: #fff;
        @include WHeight;
        padding-left: .2rem;
        p{
          height: .7rem;
          width: 100%;
          font-size: .28rem;
          line-height: .7rem;
          @include ovflo_box;
        }
        ul{
          width: 100%;
          height: auto;
          margin-bottom: .2rem;
          @include ovflo_box;
          li{
            width: auto;
            height: auto;
            border: 0.01rem solid #ddd;
            padding: .1rem .2rem;
            font-size: .28rem;
            list-style: none;
            border-radius: .1rem;
            margin-left: .1rem;
            margin-top: .1rem;
            @include ovflo_box;
            @include Left;
          }
          li:first-child{
            margin-left: 0;
          }
        }
      }
    }
  }
</style>
