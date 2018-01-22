<template>
  <div>
    <div class="header">
      <a @click="handleGoBack" class="back" href="javascript:;"></a>
      PRIVACY POLICY
    </div>
    <div class="content">
      <p>TUBATULU PROMISES TO USE PERSONAL INFORMATION IN CORRECT WAY, AND ABIDE BY THE LAW AND REGULATION TO PROTECT INDIVIDUAL INFORMATION AND PRIVACY. WE PAY HIGHLY ATTENTION TO PROTECT INDIVIDUAL PRIVACY.</p> 
      <p>YOU ARE HEREBY NOTIFIED THAT THE INDIVIDUAL INFORMATION YOU PROVIDED TO RECEIVE TUBATULU SERVICES, WHICH INCLUDES THE SUPPLY AND DELIVERY OF GOODS OR SERVICE. TUBATULU WILL NOT BE ABLE TO OFFER ADEQUATE SERVICES TO YOU, IF YOU FAIL TO PROVIDE PERSONAL INFORMATION.</p> 
      <p>YOU SHALL SUBMIT A WRITTEN INFORM THAT REQUIRES TUBATULU TO RECALL INDIVIDUAL AUTHORITY OR THE PERSONAL INFORMATION FOR INDIVIDUAL USE ONLY. TUBATULU WOULD STOP OR LIMIT THE USAGE OF PERSONAL INFORMATION IMMEDIATELY WHEN WE RECEIVED THE WRITTEN INFORM. FOR AVAILABLE CONTACT METHODS, PLEASE REFER TO THE FOLLOWING SECTION OF “CONTACT US”.</p>
      <p>IN ORDER TO REACH THE LEGAL COMMERCIAL PURPOSES, OR ACHIEVE THE FOLLOWING PURPOSES OR THE SITUATIONS CONTAINED HEREIN, TUBATULU MAY GIVE PERSONAL INFORMATION TO OTHERS:</p>
      <p>DURING THE PROCESS OF EXPECTANT OR ACTUAL SALES, ALL OR MOST BUSINESS WILL BE RECOMBINE ,INTEGRATE, OR COMBINE THE RELATED ADVERTISEMENT OF TUBATULU IN PROPAGATING, MARKETING, AND COMMUNICATING;</p>
      <p>ACCORDING TO THE REQUIREMENT OF LAW, TUBATULU WILL REVEAL PERSONAL INFORMATION UNDER THE ORDER OF JURISDICTIONAL COURT, REGULATOR OR GOVERNMENT OR OTHER RELATED AUTHORITATIVE GUIDANCE AND REGULATION.</p>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleGoBack (){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    .back {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.3rem;
      width: 0.32rem;
      height: 0.32rem;
      background-image: url(../assets/icon/back@2x.png);
      background-repeat: no-repeat;
      background-size: 0.18rem 0.32rem;
      background-position: center center;
    }
  }
  .content {
    padding: 0.3rem;
    text-align: left;
    font-size: 0.24rem;
    p {
      text-indent: 2em;
      margin-bottom: 0.2rem;
    }
  }
</style>
