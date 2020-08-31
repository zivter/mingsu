<template>
  <div class="orderList">
    <van-row type="flex" justify="space-around" class="orderCard" v-for="(item,index) in allOrderQuery" :key="index" @click="goDetail(item.orderNumber,item.roomId)">
      <van-col span="12" class="orderCardLeft">
        <p class=‘ordername’>{{ item.roomTitle }}</p>
        <p>{{ item.from | timeFilter }}-{{ item.to | timeFilter }}    {{ item.lodgerCount }}位</p>
        <p>{{ item.status | statusFilter }}¥{{ item.payment }}</p>
      </van-col>
      <van-col span="8"><img class="cardListImg" :src="GLOBAL.imgSrc+item.roomCover" alt=""></van-col>
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
        paid:'订单已完成',
        cancel:'订单已取消'
      }
      return status[val]
    },
    timeFilter(val){
      return moment(val).format('YYYY/MM/DD')
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
        MaxResultCount:20
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
.ordername{

}
.cardListImg{
  width: 125px;
  height: 85px;
  margin-top: 16px;
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
    line-height: 24px;
  }
  p:nth-child(1){
    font-size: 15px;
    color: #000;
    font-weight: 700;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
  }
}
</style>
