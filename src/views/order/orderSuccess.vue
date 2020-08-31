<template>
  <div class="orderSuccess">
    <img class="successImg" src="@/assets/img/right.png" alt="">
    <p class="title">支付成功</p>
    <van-button class="successBtn" color="#DA4F53" @click="backCenter">返回个人中心</van-button>
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
  padding: 20px 20px;
  background: #f8f8f8;
  min-height: 100vh;
  .successImg{
    margin: 0 auto;
    display: block;
  }
  .title{
    font-size: 20px;
    color: #666;
    font-weight: 700;
    text-align: center;
    line-height: 80px;
  }
  .successBtn{
    margin: 0 auto;
    text-align: center;
    display: block;
    border-radius: 5px;
  }
}
</style>
