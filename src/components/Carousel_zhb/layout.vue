<template>
  <section class="banner-zhb" id="shangping">
      <swiper ref="mySwiper" class="swiper-wrapper" :options="swiperOption">
        <swiper-slide class="swiper-slide bannerImgs" v-for="items in dataBanner" :key="items.id">
          <img :src="items" alt="" @click="register">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </section>
</template>
<style scoped>
  .bannerImgs img{
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'layout',
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay:3000,
            disableOnInteraction: false
          },
          observer:true,
          //轮播方式
          effect: 'fade',
          autoHeight:'auto',
          fadeEffect:{
            crossFade:true
          },
          pagination: {
            el: '.swiper-pagination'
          },
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex+1
            this.index = swiper.realIndex
          }
        },
      }
    },
    props: ['dataBanner'],
    mounted: function () {
      this.swiper.slideTo(0, 0, false)
      this.swiper.pagination.render(true)
      this.swiper.pagination.update()
    },
    computed: {
      swiper (){
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      register(){
        if(this.$route.path == '/'){
          this.$router.push({path:'/register'})
        }
      }
    }
  }
</script>
