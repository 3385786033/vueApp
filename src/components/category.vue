<template>
  <div>
    <div class="header">
      <a @click="handleGoBack" class="back" href="javascript:;"></a>
      <div class="search">
        <i class="search-icon"></i>
        <input @touchstart='goToSearch' type="text" placeholder="SEARCH">
      </div>
    </div>
    <div class="category">
      <iscroll-view ref="firstScrollView" :class="{'wrapper-left':true, 'scroll-view':true,'mt':isShow}">
        <v-touch tag='ul' @tap="handleGetCategorySecondList($event)" class="content">
          <li v-for="(item,index) in categoryList" :key="index">
            <a href="javascript:;" :data-id="item.cat_id" :class="{active:categoryListId == item.cat_id}">{{item.cat_name_en}}</a>
          </li>
        </v-touch>
      </iscroll-view>
      <iscroll-view ref="scrollView" :class="{'wrapper-right':true, 'scroll-view':true,'mt':isShow}">
         <div v-for="(item,index) in secondCategoryList" :key="index" class="category-2">
            <h2 class="title">{{item.cat_name_en}}</h2>
            <div  class="second-list">
              <div v-for="(itemThree,index) in item.three" :key="index">
                <!-- <router-link :to="{name:'commodity',params:{id:itemThree.cat_id}}">
                  <img :src="itemThree.cat_image" alt="">
                  <p>{{itemThree.cat_name_en}}</p>
                </router-link> -->
                <v-touch tag='a' @tap="goToCommodity(itemThree.cat_id)" :to="{name:'commodity',params:{id:itemThree.cat_id}}">
                  <img :src="itemThree.cat_image" alt="">
                  <p>{{itemThree.cat_name_en}}</p>
                </v-touch>
              </div>
            </div>
         </div>
      </iscroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryList:[], // 分类一级列表
      secondCategoryList:[], // 分类二级列表
      categoryListId:2 // 一级列表id
    }
  },
  computed: {
    isShow() {
      return this.$store.state.isShow
    }
  },
  created () {
    this.getCategoryList()
    this.getCategoryList(2)
  },
  updated () {
    this.$refs.scrollView.refresh();
    this.$refs.firstScrollView.refresh();
  },
  methods: {
    // 请求分类一级列表和二级列表
    getCategoryList (id=0) {
      this.$axios.get(`goods/category`,{params:{cat_id:id}}).then(
        ({data:{data}}) => {
          if(id == 0){
            this.categoryList = data.category
            return
          }
          if(id !== 0) {
            this.secondCategoryList = data.category
          }
        }
      )
    },
    // 列表切换事件
    handleGetCategorySecondList (e) {
      if(e.target.nodeName != 'A'){
        return
      }
      this.categoryListId = e.target.dataset.id
      this.getCategoryList(this.categoryListId)
    },
    handleGoBack() {
      this.$router.push('/')
    },
    // 切换到搜索页
    goToSearch () {
      this.$router.push('/searchGoods')
    },
    goToCommodity (id) {
      this.$router.push( {name: 'commodity', params: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color:#eee;
.link {
  display: block
}
.header {
  position: relative;
  width: 100%;
}
.back {
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  left: 0.1rem;
  width: 0.42rem;
  height: 0.42rem;
  background-image: url('../assets/icon/home.png');
  background-repeat: no-repeat;
  background-size: 0.42rem 0.42rem;
}
.search {
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  padding: 0.2rem 0;
  width: 6.3rem;
  height: 0.56rem;
  input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    outline: none;
    border: none;
    padding-left: 0.56rem;
    font-size: 0.26rem;  
  }
  .search-icon {
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.32rem;
    height: 0.33rem;
    background-image:url(../assets/icon/Magnifier@2x.png);
    background-repeat: no-repeat;
    background-size: 0.32rem 0.33rem;
    font-size: 0.28rem;
  }
}
.category {
    border-top:0.01rem solid $border-color;
    text-align: center;
  }
.mt {
  margin-top:1rem
}
.scroll-view {
  /* -- Attention: This line is extremely important in chrome 55+! -- */
  touch-action: none;
  /* -- Attention-- */
  position: fixed;
  top: 0.97rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.wrapper-left {
  box-sizing: border-box;
  border-right:0.01rem solid $border-color;
  width: 2.08rem;
  padding:0 0.12rem;
  li {
    padding: 0.36rem 0;
    width: 1.8rem;
    height: 0.52rem;
    &:first-child {
      padding-top:0.36rem;
    }
    &:last-child {
      padding-bottom: 0.36rem;
    }
    a {
      width: 100%;
      // height: 100%;
      font-size: 0.26rem;
      line-height: 0.52rem;
      display: block;
      color: #333;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .active {
      background-color: #333;
      color: #eee
    }
  }
}
.wrapper-right {
  z-index: -1;
  padding-left: 2.08rem;
  .category-2 {
    padding:0.34rem 0;
  }
  .title {
    text-align: left;
    padding-left: 0.2rem;
    font-size: 0.26rem;
  }
  .second-list {
    margin-top:0.46rem;
    display: flex;
    flex-wrap: wrap;
    div {
      width: 33.333%;
      height: 1.64rem;
      font-size: 0.24rem;
      margin-bottom: 0.4rem;
    }
    a,
    img {
      margin-left: auto;
      margin-right: auto;
      display: block;
      width: 0.88rem;
    }
    p {
      margin-top:0.2rem;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
}
</style>

