<template>
  <div class="orderCenter">
    <van-nav-bar
      title="我的优惠券"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs
    v-model="active"
    class="orderNav"
    title-active-color='#DA4F53'
    title-inactive-color='#B4B4B4'
    line-width='25px'
    line-height='2px'
    color="#DA4F53"
    :border='false'>
      <van-tab title="未使用"><couponList couponType='true'/></van-tab>
      <van-tab title="不可用"><couponList couponType='false'/></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import couponList from './component/couponList'
export default {
  name: 'orderCenter',
  props:  {
  },
  components:{ couponList},
  data() {
    return {
      active:'1'
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {},
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
