<template>
  <div class="coupon">
    <div class="couponT couponContent">
      <p class="title">名宿优惠券</p>
      <van-divider dashed class="vdivider"></van-divider>
      <p class="couponName">{{ couponAvailable.title }}</p>
      <p class="description">{{ couponAvailable.description }}</p>
      <van-button round type="danger" :disabled="isGet?true:false" class="saveBtn" @click="takeCouponTaken">领取</van-button>
      <cell-components
        cell-name='使用时间'
        :cell-value='couponAvailable.startTime +  " 至 " +  couponAvailable.endTime'
        cell-color='#000'/>
      <van-divider dashed></van-divider>
      <cell-components
        cell-name='使用条件'
        :cell-value='couponAvailable.description'
        cell-color='#000'/>
      <van-divider dashed></van-divider>
      <cell-components
        cell-name='使用须知'
        :cell-value='couponAvailable.description'
        cell-color='#000'/>
    </div>
    <div class="couponB couponContent">
      <cell-components
        cell-name='联系地址'
        cell-value='test'
        cell-color='#000'/>
      <van-divider dashed></van-divider>
      <cell-components
        cell-name='联系电话'
        cell-value='test'
        cell-color='#000'/>
    </div>
  </div>
</template>

<script>
import { GetAvailableList, takeCouponTaken } from '@/api/coupon'
import moment from 'moment'
import cellComponents from '@/components/cellComponents/index'

export default {
  name: 'Coupon',
  props:  {
  },
  components:{ cellComponents },
  data() {
    return {
      couponAvailable: [],
      isGet: false
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    timeFilter(val){
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created() {
    this.GetAvailableList()
  },
  mounted() {},
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
        if(result.result.items.length > 0){
          this.couponAvailable = result.result.items[0]
          this.couponAvailable.startTime = moment(this.couponAvailable.startTime).format('YYYY.MM.DD')
          this.couponAvailable.endTime = moment(this.couponAvailable.startTime).format('YYYY.MM.DD')
          if(this.couponAvailable.takeCount>0){
            this.isGet = true
          }
        }
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
}
.couponName{
  text-align: center;
  line-height: 48px;
}
.description{
  text-align: center;
  line-height: 48px;
}
.saveBtn{
  width: 150px;
  display: block;
  margin: 30px auto 20px;
  line-height: 10px;
}
/deep/ .van-button{
  height: 36px;
  line-height: 36px;
}
/deep/ .cellComponents{
  margin-left: 16px!important;
}
</style>
