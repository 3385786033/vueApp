<template>
  <div>
    <div class="header">
      <a @click="handleGoBack" href="javascript:;" class="back"></a>
      SIGN UP
    </div>
    <div class="container">
      <form action="">
        <div class="phone">
          <input type="text" v-model="user.mobile" placeholder="PHONE NUMBER">
        </div>
        <div class="auth-code">
          <input type="text" v-model="user.code" placeholder="VERIFICATION CODE">
          <span @click="handleSendAuthCode($event)" class="auth-btn">GET</span>
        </div>
        <div class="password">
          <input :type="type" v-model="user.password" placeholder="PASSWORD(6-16)">
          <span @click="changeVisible($event)" :class="{'visible':isVisible,'hide':!isVisible}"></span>
        </div>
        <div class="name">
          <input type="input" v-model="user.nick_name" placeholder="NAME">
        </div>
        <div class="email">
          <input type="input" v-model="user.email" placeholder="E-MAIL">
        </div>
        <button :disabled="!isAgreeMent" @click.prevent="handleRegister" class="register-bar">SIGN UP</button>
        <div class="agreement">
          <span @click="handleChecked" class="checkbox"><i class="checked" v-show="isAgreeMent"></i></span><router-link to="/agreement">AGREE TO TUBATULU.COM POLICY</router-link>
        </div>
      </form>
      <!-- <div class="jump">
        <router-link to="/login">登陆</router-link>
        <router-link to="/findpwd">忘记密码</router-link>
      </div> -->
    </div>
    <div class="err" v-show="isShowErr">{{errMsg}}</div>
  </div>
</template>

<script>
import {checkPwd,checkMobile,checkAuthCode,checkEmail} from "../assets/js/check"
export default {
  data () {
    return {
      errMsg:'',
      time:60,
      user:{
        mobile:'',
        code:'',
        password:'',
        email:'',
        nick_name:''
      },
      isShowErr:false,
      isAgreeMent:true,
      isVisible:true,
      type:'password'
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
    // 密码显示隐藏
    changeVisible (event) {
      this.isVisible = !this.isVisible
      if(this.isVisible == false){
        this.type = 'text'
      }else {
        this.type = 'password'
      }
    },
    // 发送验证码
    handleSendAuthCode (event) {
      if(this.time != 60) {
        return;
      }
      if(!checkMobile(this.user.mobile)){
        this.showErr('Please fill out the correct phone number')
        return
      }
      // 让发送按钮读秒
      const timer =  setInterval(()=>{
        this.time--;
        event.target.innerHTML = this.time + 's';
        if(this.time <= 0){
          clearInterval(timer);
          event.target.innerHTML = 'GET'
          this.time = 60
        }
      },1000)
      this.$axios.post(`/send_verify_code`,{mobile:this.user.mobile})
      .then(
        ({data}) => {
          this.showErr(data.msg)
        }
      )
    },
    // 点击注册
    handleRegister () {
      if(!checkMobile(this.user.mobile)){
        this.showErr('Please fill out the correct phone number')
        return
      }
      if(!checkAuthCode(this.user.code)){
        this.showErr('Please fill out the correct verification code')
        return
      }
      if(!checkPwd(this.user.password)){
        this.showErr('The password should be 6-16 numbers')
        return
      }
      if(!checkEmail(this.user.email)){
        this.showErr('Please fill out the correct email address')
        return
      }
      if(!this.user.nick_name.trim()){
        this.showErr('Account name can not be blank')
        return
      }
      this.$axios.post (`/register`,this.user)
      .then (
        ({data}) => {
          if(data.status == -1){
            this.showErr(data.msg)
            console.log(data)
            return
          }
          this.$router.push("/download")
        }
      )
    },
    handleChecked () {
      this.isAgreeMent = !this.isAgreeMent
    },
    handleGoBack() {
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
  .password,
  .name,
  .email {
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
    width: 0.9rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.24rem;
    background-color: #ffffff;
    border: solid 0.01rem #333333;
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
    position: relative;
    padding-left: 0.1rem;
    height: 0.5rem;
    margin-top:0.36rem;
    .checkbox {
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      bottom: 0;
      width: 0.24rem;
      height: 0.24rem;
      border: 0.01rem solid #999;
      .checked {
        position: absolute;
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
        margin-left: 0.35rem;
        font-size: 0.2rem;
        line-height: 0.5rem;
    }
  }
  .jump {
    margin-top:0.74rem;
    padding-left: 0.1rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
  }
  .err {
    // display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    padding:0.24rem 0.2rem;
    font-size: 0.32rem;
    background: $btn-bgcolor;
    border-radius: 0.2rem;
    color: #fff;
    text-align: center;
    transition: all 1s
  }


</style>


