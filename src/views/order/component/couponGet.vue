<template>
  <div class="coupon">
    <p class="title">优惠券领取</p>
      <div class="couponCard" v-if="couponAvailableList.length > 0" @click="takeCouponTaken">
        <!-- <div :class="isGet==true?'couponLeft1 couponLeft':'couponLeft2 couponLeft'"> -->
        <div :class="isGet==true?'couponLeft1 couponLeft':'couponLeft2 couponLeft'">
          <p class="type" v-if="couponAvailableList[0].type == 'Amount'"><span class="count">{{ couponAvailableList[0].reducedAmount }}</span>元</p>
          <p class="type" v-else-if="couponAvailableList[0].type == 'Discount'"><span class="count">{{ 100 - couponAvailableList[0].discounts}}</span>折</p>
          <p class="targetAmount">满{{ couponAvailableList[0].targetAmount }}元可用</p>
        </div>
        <div class="couponRight">
          <p class="couponTitle">{{ couponAvailableList[0].title }}</p>
          <p class="description">{{ couponAvailableList[0].description }}</p>
          <van-divider />
          <p class="time">{{ couponAvailableList[0].startTime | timeFilter }} - {{ couponAvailableList[0].endTime | timeFilter }}</p>
        </div>
      </div>
      <p v-if="couponAvailableList.length == 0" class='nomoreCoupon'>暂无更多优惠券...</p>
  </div>
</template>

<script>
import { GetAvailableList, takeCouponTaken } from '@/api/coupon'
import moment from 'moment'

export default {
  name: 'Coupon',
  props: { },
  computed: {

  },
  data(){
    return {
      couponAvailableList:[],
      isGet:false
    }
  },
  filters:{
    timeFilter(val){
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created(){
    this.GetAvailableList()
  },
  methods:{
    /**
     * 获取优惠券列表
     */
    GetAvailableList(){
      const param = {
        SkipCount:0,
        MaxResultCount:20
      }
      GetAvailableList(param).then((result) => {
        this.couponAvailableList = result.result.items
        // if(this.couponAvailableList[0].takeCount>0){
        //   this.isGet = true
        // }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /* 领取优惠券 */
    takeCouponTaken(){
      if(this.isGet == true){
        this.$notify({type:'warning',message:'此优惠券已领取'})
        return
      }
      const param = {
        id: this.couponAvailableList[0].id
      }
      takeCouponTaken(param).then((result) => {
        if(result.success == true){
          this.$notify({type:'success',message:'领取成功'})
          this.isGet = true
          this.$emit('GetMyCoupons', true)
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.coupon{
  padding: 16px 0;
  // DA4F53
  .title{
    text-align: center;
    font-size: 20px;
    line-height: 24px;
  }
  .couponCard{
    margin-top: 20px;
    margin: 30px 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    display: flex;
    overflow: hidden;
    .couponLeft1{
      background: #ddd;
    }
    .couponLeft2{
      background: #FA113F;
    }
    .couponLeft{
      opacity: 0.9;
      padding: 20px;
      color: #fff;
      .count{
        font-weight: 700;
        font-size: 40px;
      }
      .type{

      }
      .targetAmount{
        font-size: 13px;
      }
    }
    .couponRight{
      padding: 10px 20px;
      flex: 1;
      .couponTitle{
        color: #555;
      }
      .description{
        color: #999;
        font-size: 13px;
        margin-top: 6px;
      }
      .time{
        color: #999;
        font-size: 12px;
      }
    }
  }
  .nomoreCoupon{
    margin-top:30px;
    text-align:center;
  }
}
</style>
