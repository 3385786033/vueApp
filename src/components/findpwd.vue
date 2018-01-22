<template>
  <div>
    <div class="header">
      <a href="javascript:;" @click="handleGoBack" class="back"></a>
      找回密码
    </div>
    <div class="container">
      <form action="">
        <div class="phone">
          <input v-model="user.mobile" type="text" placeholder="手机号">
        </div>
        <div class="auth-code">
          <input v-model="user.code" type="text" placeholder="验证码">
          <span @click="handleSendAuthCode($event)" class="auth-btn">获取验证码</span>
        </div>
        <div class="password">
          <input v-model="user.password" type="password" placeholder="密码(6-16位)">
          <span class="visible"></span>
        </div>
        <button @click.prevent="handleFindPwd" class="register-bar">确认</button>
      </form>
    </div>
    <div v-show="isShowErr" class="err">
      {{errMsg}}
    </div>
  </div>
</template>

<script>
import {checkPwd,checkMobile,checkAuthCode} from "../assets/js/check"
export default {
  data () {
    return {
      time:60,
      errMsg:'请填写正确的xx',
      isShowErr:false,
      user:{
        mobile:'68873126',
        code:'1024',
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
    handleFindPwd () {
      if(!checkMobile(this.user.mobile)){
        this.showErr("请填写正确手机号")
        console.log(this.isShowErr)
        return
      }
      if(!checkPwd(this.user.password)) {
        this.showErr("请填写正确的密码")
        return
      }
      if(!checkAuthCode(this.user.code)) {
        this.showErr('请填写正确的验证码')
        return
      }
      this.$axios.post(`/forgot_pass_word`,this.user)
      .then(
        ({data}) => {
          if(data.status == -1){
            this.showErr(data.msg)
            return
          }
          this.$router.push('/login')
        }
      )
    },
    handleSendAuthCode (event) {
      if(this.time != 60) {
        return;
      }
      if(!checkMobile(this.user.mobile)){
        this.showErr('请填写正确的手机号')
        return
      }
      // 让发送按钮读秒
      const timer =  setInterval(()=>{
        this.time--;
        event.target.innerHTML = this.time + 's';
        if(this.time <= 0){
          clearInterval(timer);
          event.target.innerHTML = '发送验证码'
        }
      },1000)
      this.$axios.post(`/send_verify_code`,{mobile:this.user.mobile})
      .then(
        ({data}) => {
          console.log(data)
          if (data.status == -1){
            this.errMsg = data.status.msg
          }
        }
      )
    },
    handleGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  $border-color:#dedede;
  $btn-bgcolor:#333;
  input,
  button {
    border:none;
    outline: none;
  }
  .header {
    position: relative;
    width: 100%;
    height: 0.8rem;
    border-bottom: 0.01rem solid $border-color;
    text-align: center;
    line-height: 0.8rem;
  }
  .back {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    left: 0.36rem;
    width: 0.18rem;
    height: 0.32rem;
    background-image: url("../assets/icon/back@2x.png");
    background-size:0.18rem 0.32rem;
  }

  .container {
    width: 5rem;
    margin: 0 auto;
  }

  .phone,
  .auth-code,
  .password {
    position: relative;
    width: 100%;
    height: 1rem;
    font-size: 0.3rem;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: $border-color;
    }
    input {
      width: 100%;
      height: 100%;
    }
  }
  .auth-btn {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 0;
    box-sizing: border-box;
    width: 1.6rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.12rem;
    background-color: #ffffff;
    border: solid 1px #333333;
  }
  .visible,
  .hide {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 0.05rem;
    width: 0.52rem;
    height: 0.2rem;
    background-repeat: no-repeat;
    background-size: 0.52rem 0.2rem;
  }
  .visible {
    background-image: url("../assets/icon/eye_2.png");
  }
  .hide {
    background-image: url("../assets/icon/eye.png");
  }
  .register-bar {
    border: none;
    outline: none;
    width: 5rem;
    height: 0.72rem;
    background-color: $btn-bgcolor;
    color: #fffefe;
    margin-top:1rem;
    font-size: 0.3rem;
  }
  .agreement {
    padding-left: 0.1rem;
    margin-top:0.36rem;
    .checkbox {
      position: relative;
      display: inline-block;
      width: 0.24rem;
      height: 0.24rem;
      border: 1px solid #999;
      .checked {
        position: absolute;
        top: 0;
        height: 0;
        width: 100%;
        height: 100%;
        background-image: url("../assets/icon/check.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 0.2rem 0.14rem;
      }
    }
    a {
        text-decoration: underline;
        margin-left: 0.1rem;
        font-size: 0.2rem;
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


