<template>
  <div class="rentList">
    <van-nav-bar title="租房订单" left-text left-arrow @click-left="$router.go(-1);" />
    <div class="rentCard"
    v-for="(item,index) in allOrderQuery" :key="index" @click="goDetail(item.orderNumber,item.roomId)">
      <div class="rentTop">
        <p class="rentTime">{{ item.from | timeFilter }}</p>
        <p class="rentStatus">{{ item.status | statusFilter }}</p>
      </div>
      <div class="rentBtm">
        <img class="rentImg" :src="GLOBAL.imgSrc+item.roomCover">
        <div class="rentRight">
          <p class='rentname'>{{ item.roomTitle }}</p>
          <p class="rentType">酒店公寓</p>
          <p class="rentStatus">¥{{ item.payment }}/月</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetAllOrderQuery } from '@/api/orderQuery'
import moment from 'moment'

export default {
  name: 'RentalList',
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
$btnColor: #da4f53;
$btnBorderColor: #f7f7f7;
$whiteFontColor: #fff;
$blackFontColor: #000;
$bgColor: #f7f7f7;
$subBgColor: #fff;
.rentList{
  background: $bgColor;
  padding-bottom: 60px;
}
.rentCard{
  background: #fff;
  margin-top: 10px;
  margin: 10px 10px 0;
  border-radius: 4px;
  padding: 0 10px 10px;
}
.rentTop{
  overflow: hidden;
  font-size: 12px;
  line-height: 32px;
  .rentTime{
    float: left;
    color: #666;
  }
  .rentStatus{
    float: right;
    color: $btnColor;
  }
}
.rentBtm{
  overflow: hidden;
  display: flex;
  .rentImg{
    float: left;
    width: 160px;
    display: block;
    height: 120px;
  }
  .rentRight{
    float: left;
    flex: 1;
    line-height: 24px;
    margin-left: 12px;
    .rentname{
      font-size: 14px;
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2; 
    }
    .rentType{
      color:#999;
      font-size: 12px;
    }
    .rentStatus{
      margin-top: 10px;
      color: $btnColor;
    }
  }
}
</style>
