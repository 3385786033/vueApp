<template>
  <div class="commodity-main-zhb">
    <p class="commodity-title-zhb" id="details">goods details</p>
    <div v-html="commodImgs.desc" class="infoImgs">

    </div>
  </div>
</template>
<style scoped>
  .commodity-main-zhb{
    height: auto;
    width: 100%;
    box-sizing: border-box;
    margin-top: .1rem;
    overflow: hidden;
  }
  .commodity-title-zhb{
    height: .86rem;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding-left: .2rem;
    margin-bottom: .05rem;
    /*color: #ccb9b9;*/
    font-size: .24rem;
    line-height: .86rem;
  }
  .commodity-main-zhb img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .infoImgs{
    height: auto;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
<script>
  export default {
    name: 'commodity',
    data () {
      return {}
    },
    props: ['commodImgs']
  }
</script>
