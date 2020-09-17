<template>
  <div class="orderList">
    <van-row type="flex" justify="space-around" class="orderCard"
    v-for="(item,index) in allOrderQuery" :key="index" @click="goDetail(item.orderNumber,item.roomId)">
      <van-col span="12" class="orderCardLeft">
        <p class='ordername'>{{ item.roomTitle }}</p>
        <p class="orderTime">{{ item.from | timeFilter }}-{{ item.to | timeFilter }}<span style="margin-left:8px">{{ item.lodgerCount }}位</span></p>
        <p class="orderStatus">{{ item.status | statusFilter }}<span class='orderMoney'>¥{{ item.payment }}</span></p>
      </van-col>
      <van-col span="8"><img class="cardListImg" :src="GLOBAL.imgSrc+item.roomCover"></van-col>
    </van-row>
  </div>
</template>

<script>
import { GetAllOrderQuery } from '@/api/orderQuery'
import moment from 'moment'

export default {
  name: '',
  props:  {
    orderType:{
      type: String,
      required: false
    }
  },
  components:{ },
  data() {
    return {
      allOrderQuery:[]
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    statusFilter(val){
      const status = {
        Pending:'订单待支付',
        Paid:'订单已支付',
        Refund: '订单已退款',
        Cancel:'订单已取消',
        Closed: '订单已关闭',
        Expired: '订单已失效'
      }
      return status[val]
    },
    timeFilter(val){
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created() {
  },
  mounted() {
    this.GetAllOrderQuery()
  },
  methods:{
    GetAllOrderQuery(){
      const param = {
        Keyword:'',
        OrderStatus: this.orderType=='all'?'':this.orderType,
        from:'',
        to:'',
        SkipCount:0,
        MaxResultCount:50
      }
      GetAllOrderQuery(param).then((result) => {
        this.allOrderQuery = result.result.items
      }).catch((err) => {
        
      });
    },
    goDetail(id,roomId){
      this.$router.push({
        path:'orderDetail',
        query:{
          id: id,
          roomId: roomId
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>

.cardListImg{
  width: 125px;
  height: 85px;
  margin-top: 17px;
  border-radius: 6px;
}
.orderCard{
  background: #fff;
  margin-top: 10px;
  height: 120px;
}
.orderCardLeft{
  padding: 24px 0 0 12px;
  p{
    font-size: 12px;
    color: #333;
    line-height: 20px;
  }
  .ordername{
    font-size: 15px;
    color: #000;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1; 
  }
  .orderTime{
    margin-top: 8px;
  }
}
.orderMoney{
  color: #DA4F53;
  margin-left: 6px;
}
</style>
