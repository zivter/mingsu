<template>
  <div class="coupon">
    <div class="couponT couponContent">
      <p class="title">{{ couponAvailable.title || '名宿优惠券' }}</p>
      <van-divider dashed class="vdivider"></van-divider>
      <p class="couponName">{{ couponAvailable.title | titleFilter }}</p>
      <p class="description" v-if="couponAvailable.type==='Amount'">满{{ couponAvailable.targetAmount }}减{{ couponAvailable.reducedAmount }}元</p>
      <p class="description" v-if="couponAvailable.type==='Discount'">满{{ couponAvailable.targetAmount }}元{{ couponAvailable.discounts }}折</p>
      <van-row type="flex" justify="space-around">
        <van-col span="20" v-if="!isGet"><van-button round type="danger" :disabled="isGet" class="saveBtn" @click="takeCouponTaken">领取</van-button></van-col>
        <van-col span="20" v-if="isGet"><van-button round type="primary" class="saveBtn" @click="getOrder">已领取,即刻下单</van-button></van-col>
      </van-row>
      <cell-components
        cell-name='使用时间'
        style="padding-left:12px"
        :cell-value='couponAvailable.startTime +  " 至 " +   couponAvailable.endTime'
        cell-color='#000'/>
      <van-divider dashed></van-divider>
      <cell-components
        cell-name='使用须知'
        style="padding-left:12px"
        :cell-value='couponAvailable.description'
        cell-color='#000'/>
    </div>
  </div>
</template>

<script>
import { GetDetailCoupon, takeCouponTaken } from '@/api/coupon'
import tokenAuth from '@/utils/tokenAuth';
import moment from 'moment'
import Vue from 'vue'
import cellComponents from '@/components/cellComponents/index'
import share from '@/utils/share';
import Cookies from 'js-cookie'

export default {
  name: 'Coupon',
  props:  {
  },
  components:{ cellComponents },
  data() {
    return {
      couponAvailable: {
        startTime:'',
        endTime:''
      },
      isGet: false
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    timeFilter(val){
      if(val){
        return moment(val).format('YYYY.MM.DD')
      }else{
        return ''
      }
    },
    titleFilter(val){
      if(!val){
        return '暂无优惠券'
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      Cookies.set('couponId', this.$route.query.id)
    }
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query, 'couponGet');
    this.GetDetailCoupon()
  },
  mounted() {},
  methods:{
    /**
     * 获取优惠券列表
     */
    GetDetailCoupon(){
      const couponId = Cookies.get('couponId');
      const param = {
        id: couponId
      }
      GetDetailCoupon(param).then((result) => {
        Cookies.remove('couponId')
        if(result.result){
          this.couponAvailable = result.result;
          this.couponAvailable.startTime = moment(this.couponAvailable.startTime).format('YYYY.MM.DD')
          this.couponAvailable.endTime = moment(this.couponAvailable.endTime).format('YYYY.MM.DD')
          if(this.couponAvailable.canTake === true && this.couponAvailable.hasTaken === false && moment(this.couponAvailable.takeEndTime).isAfter(moment().format())) {
            this.isGet = false
          } else {
            this.isGet = true
          }
        }else{
          this.couponAvailable.startTime = ''
          this.couponAvailable.endTime = ''
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      }).finally(() => {
      });
    },
    /* 领取优惠券 */
    takeCouponTaken(){
      if(this.isGet == true){
        this.$notify({type:'warning',message:'此优惠券已领取'})
        return
      }
      const param = {
        id: this.couponAvailable.id
      }
      takeCouponTaken(param).then((result) => {
        if(result.success == true){
          this.$notify({type:'success',message:'领取成功'})
          this.isGet = true
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    getOrder() {
      this.$router.push({
        path:'./'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.coupon{
  background: #DA4F53;
  padding: 10px 10px 0;
  min-height: 100vh;
}
.couponContent{
  background: #fff;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.couponB{
  padding-top: 16px;
}
.vdivider:before{
  background-size: 30px;
}
.title{
  margin-left: 20px;
  padding-top: 10px;
  text-align: center;
  color: #444;
}
.couponName{
  text-align: center;
  line-height: 48px;
}
.description{
  text-align: center;
  line-height: 48px;
  color: #444;
  font-weight: 700;
  font-size: 24px;
}
.saveBtn{
  width: 150px;
  display: block;
  margin: 30px auto 20px;
  line-height: 10px;
}
</style>
