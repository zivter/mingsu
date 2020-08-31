<template>
  <div class="couponList">
    <div class="couponCard" v-for="item in couponList" :key="item.id">
      <div class="couponT overflow">
        <div class="couponL float-left">
          <p>{{ item.title }}</p>
          <p>{{ item.startTime | timeFilter }} - {{ item.endTime | timeFilter }}</p>
        </div>
        <div class="float-right price">
          <p v-if="item.type == 'Discount'">{{ item.discounts * 10 }}<span style="font-size:12px;">折</span></p>
          <p v-else-if="item.type == 'Amount'">{{ item.reducedAmount }}<span style="font-size:12px;">元</span></p>
          <p style="font-size:13px;">满{{ item.targetAmount }}元</p>
        </div>
      </div>
      <van-divider dashed :hairline=false></van-divider>
      <div class="couponBtm">
        <p>{{ item.description }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { GetMyCoupons } from '@/api/coupon';
import moment from 'moment';
export default {
  name: '',
  props:  {
    couponType:{
      type: Boolean,
      required: false
    }
  },
  components:{ },
  data() {
    return {
      couponList:[]
    }
  },
  computed: {
  },
  watch: {},
  filters:{
    timeFilter(val){
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created() {
  },
  mounted() {
    this.GetMyCoupons()
  },
  methods:{
    GetMyCoupons(){
      var param = {
        CanUse:this.couponType,
        SkipCount:0,
        MaxResultCount:20
      }
      GetMyCoupons(param).then((result) => {
        this.couponList = result.result.items
      }).catch((err) => {
        
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.couponList{
  margin-top: 10px;
}
.couponCard{
  background: #fff;
  margin-top: 10px;
  margin: 0 15px 15px 15px;
  padding: 16px 30px;
}
.couponL{
  color: #333;
  p:nth-child(1){
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
  p:nth-child(2){
    font-size: 13px;
    line-height: 24px;
  }
}
.couponT{
  .price{
    color: #DA4F53;
    font-size: 21px;
    font-weight: 700;
  }
}
.couponBtm{
  color: #B4B4B4;
  font-size: 11px;
}
/deep/ .van-divider{
  margin: 10px 0;
}
</style>
