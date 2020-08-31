<template>
  <div class="orderCenter">
    <van-nav-bar
      title="我的订单"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs
    v-model="activeName"
    class="orderNav"
    title-active-color='#DA4F53'
    title-inactive-color='#B4B4B4'
    line-width='25px'
    line-height='2px'
    color="#DA4F53"
    :border='false'>
      <van-tab title="全部订单" name='all'><orderList orderType='all'/></van-tab>
      <van-tab title="已支付订单" name="paid"><orderList orderType='paid'/></van-tab>
      <van-tab title="待支付" name="pending"><orderList orderType='pending'/></van-tab>
      <van-tab title="未成功" name="expired"><orderList orderType='expired'/></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import orderList from './component/orderList'
export default {
  name: 'orderCenter',
  props:  {
  },
  components:{ orderList},
  data() {
    return {
      activeName: 'all'
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  created() {
    
    
  },
  mounted() {
    if(this.$route.query.type){
      this.activeName = this.$route.query.type
    }
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped lang='scss'>
.orderCenter{
  background: #F8F9FB;
  min-height: 100vh;
}
.orderNav{
  /deep/ .van-tabs__line{
    bottom: 22px;
  }
  /deep/ .van-tab__text{
    font-weight: 700;
  }
}

</style>
