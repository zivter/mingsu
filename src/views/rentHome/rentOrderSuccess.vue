<template>
  <div class="orderSuccess">
    <img class="successImg" src="@/assets/img/rentSuccess.png" alt="">
    <p class="title">恭喜您，支付成功 您的房间租赁信息我们已经收到，稍后会有工作人员与您联系，请耐心等待</p>
    <van-button class="successBtn" @click="backCenter">返回个人中心</van-button>
  </div>
</template>

<script>
export default {
  name: 'orderSuccess',
  props: {
  },
  data() {
    return {
    }
  },
  created(){
   
  },
  filters:{
  },
  methods:{
    backCenter(){
      this.$router.push({
        path: 'center',
        query:{
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.orderSuccess{
  padding: 20px 60px;
  background: #f8f8f8;
  min-height: 100vh;
  .successImg{
    margin: 30px auto;
    display: block;
    width: 80px;
  }
  .title{
    font-size: 16px;
    color: #542713;
    font-weight: 500;
    text-align: center;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
  }
  .successBtn{
    margin: 0 auto;
    text-align: center;
    display: block;
    border-radius: 5px;
    margin-top: 20px;
    border-radius: 20px;
    font-weight: 700;
    border: 2px solid #000;
  }
}
</style>
