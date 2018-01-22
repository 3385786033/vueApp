<template>
  <div class="container">
    <div class="header">
      <a href="javascript:;" class="close"></a>
    </div>
    <div class="logo">
      <img src="../assets/images/logo@2x.png" alt="">
    </div>
    <form action="">
      <input v-model="user.mobile" class="user" placeholder="Phone Number" type="text">
      <input v-model="user.password" type="password" placeholder="Password">
      <button @click.prevent="handleSignIn">Sign In</button>
    </form>
    <div class="feature">
      <a href="javascript:;" @click="handleSignUp">Sign Up</a>
      <router-link to="/findpwd">Forgetton Password</router-link>
    </div>
    <div class="other">
      <div class="o-title">
        其他登录方式
      </div>
      <div class="other-sign">
        <div>
          <a href="javascript"></a>
          Twitter
        </div>
        <div>
          <a href="javascript"></a>
          Facebook
        </div>
        <div>
          <a href="javascript"></a>
          Ins
        </div>
      </div>
    </div>
    <div v-show="isShowErr" class="err">
      {{errMsg}}
    </div>
  </div>
</template>

<script>
import {checkMobile,checkPwd} from '../assets/js/check'
export default {
  data() {
    return {
      errMsg:"登录失败",
      isShowErr:false,
      user:{
        mobile:'68873126',
        password:'wuxin123'
      }
    }
  },
  methods: {
    showErr (errMsg) {
      this.errMsg = errMsg
      this.isShowErr = !this.isShowErr
      let timer = setTimeout(()=>{
        this.isShowErr = !this.isShowErr
      },1500)
    },
    handleSignIn () {
      if(!checkMobile(this.user.mobile)){
        this.showErr("请填写正确手机号")
        return
      }
      if(!checkPwd(this.user.password)) {
        this.showErr("请填写正确的密码")
        return
      }
      this.$axios.post(`/login`,this.user).then(
        ({data}) => {
          if(data.status == -1){
            this.showErr(data.msg)
            return
          }
          this.$router.push('/')
        }
      )
    },
    handleSignUp () {
      
    }
  }
}
</script>

<style scoped lang="scss">
  $border-color:#dedede;
  $btn-bgcolor:#333;
  $ft-color:#999;
  .container {
    width: 5rem;
    margin: 0 auto;
  }

  .header {
    position: relative;
    width: 100%;
    height: 0.8rem;
    .close {
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: -0.56rem;
      width: 0.34rem;
      height: 0.34rem;
      background-image: url(../assets/icon/close@2x.png);
      background-repeat: no-repeat;
      background-size: 0.34rem 0.34rem;
    }
  }
  .logo {
    width: 100%;
    img {
      display: block;
      width: 3.6rem;
      margin: 0.6rem auto 0.7rem;
    }
  }
  input {
    width: 100%;
    height: 1rem;
    border: none;
    line-height: 1rem;
    border-bottom: 1px solid $border-color;
    color:$ft-color;
    font-size: 0.3rem;
  }
  button {
    border: none;
    outline: none;
    width: 5rem;
    height: 0.72rem;
    background-color: $btn-bgcolor;
    color: #fffefe;
    font-size: 0.3rem;
    margin-top:1rem;
  }
  .feature {
    margin-top:0.6rem;
    display: flex;
    justify-content:space-between;
    font-size: 0.28rem;
    a:last-child {
      color:$ft-color;
    }
  }

  .other {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    color:$ft-color;
    font-size: 0.14rem;
  }

  .o-title {
    position: relative;
    font-size: 0.2rem;    
    &::after,
    &::before,{
      content: '';
      position: absolute;
      top:50%;
      width: 1.46rem;
      height: 1px;
      background-color: $border-color;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  .other-sign {
    width: 100%;
    height: 1.2rem;    
    margin-top:0.6rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    color:$ft-color;
    font-size: 0.2rem;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;      
      a {
        width: 0.8rem;
        height: 0.8rem;
        border: solid 1px $border-color;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      
      &:first-child a {
        background-size: 0.5rem 0.4rem;
        background-image: url("../assets/icon/twiter.png")
      }
      &:nth-child(2) a {
        background-size: 0.26rem 0.5rem;
        background-image: url("../assets/icon/facebook.png")
      }
      &:last-child a {
        background-size: 0.42rem 0.43rem;
        background-image: url("../assets/icon/ins.png")
      }
    }
  }
  .err {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    padding:0.24rem 0.2rem;
    font-size: 0.16rem;
    background: $btn-bgcolor;
    border-radius: 0.2rem;
    color: #fff;
    text-align: center;
  }
</style>

