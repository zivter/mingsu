<template>
  <div class="orderSuccess">
    <img class="successImg" src="@/assets/img/right.png" alt="">
    <p class="title">提交成功，请耐心等待“浙拾光”打款 您的申请预计在3个工作日完成</p>
    <van-button class="successBtn" color="#DA4F53" @click="backCenter">返回个人中心</van-button>
  </div>
</template>

<script>
export default {
  name: 'WithdrawSuccess',
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
  padding: 20px 20px;
  background: #f8f8f8;
  min-height: 100vh;
  .successImg{
    margin: 20px auto 0;
    display: block;
    width:80px;

  }
  .title{
    font-size: 16px;
    color: #333;
    text-align: center;
    line-height: 30px;
    margin-top: 20px;
  }
  .successBtn{
    margin: 20px auto 0;
    text-align: center;
    display: block;
    border-radius: 5px;
  }
}
</style>
