<template>
  <div class="priceDetail">
    <div class="overflow detail1">
      <p class="float-left detail1p1">总金额</p>
      <p class="float-right detail1p2">￥{{ paymentDetail.payment }}</p>
    </div>

    <van-divider />

    <div class="overflow detail2" v-for="(item,index) in paymentDetail.details" :key="index">
      <div class="overflow" v-if="item.type == 'Deposit' || item.type == 'CleaningCost'">
        <p class="float-left">{{ item.itemName }}</p>
        <p class="float-right">￥{{ item.unitPrice }}</p>
      </div>
       <div class="overflow" v-else-if="item.type == 'Room'">
         <p class="float-left">房费 <span style="color:#999;font-size:13px;margin-left:4px;font-weight:500;">({{ item.itemName }})</span></p>
        <p class="float-right" >￥{{ item.unitPrice }}/晚</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:  {
    paymentDetail:{
      type:Object,
      required:true
    }
  },
  components:{ },
  data() {
    return {
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
  }
}
</script>

<style scoped lang='scss'>
  .priceDetail{
    height: 100%;
    padding: 80px 30px 80px  30px
  }
  .detail1{
    font-weight: 700;
    .detail1p1{
      font-size: 17px;
    }
    .detail1p2{
      font-size: 18px;
      color: #DA4F53;
    }
  }
  .detail2{
    font-weight: 700;
    font-size: 15px;
    margin-top: 40px;
    .detail1p1{
    }
    .detail1p2{
    }
  }
</style>
