<template>
  <div class="rentList">
    <van-nav-bar title="租房订单" left-text left-arrow @click-left="$router.go(-1);" />
    <div class="rentCard"
    v-for="(item,index) in allOrderQuery" :key="index" @click="goDetail(item.id,item.roomId)">
      <div class="rentTop">
        <p class="rentTime">{{ item.beginTime | timeFilter }}</p>
        <p class="rentStatus">{{ item.orderState | statusFilter }}</p>
      </div>
      <div class="rentBtm">
        <img class="rentImg" :src="GLOBAL.imgSrc2+item.cover">
        <div class="rentRight">
          <p class='rentname'>{{ item.roomTitle }}</p>
          <p class="rentType">酒店公寓</p>
          <p class="rentStatus">¥{{ item.orderDetails[0].amount }}/{{ item.rentLength }}天</p>
        </div>
      </div>
    </div>

    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多租房订单了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无租房订单...</div>
    </infinite-loading>
  </div>
</template>

<script>
import { orderInfoList } from '@/api/order'
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
      allOrderQuery:[],
      form: {
        page: 1,
        limit: 50
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    statusFilter(val){
      const status = ['待付款', '进行中', '已完成', '已取消']
      return status[val]
    },
    timeFilter(val){
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created() {
  },
  mounted() {
  },
  methods:{
    /**无线滚动 */
    infiniteHandler($state) {
      orderInfoList(this.form).then((result) => {
        this.allOrderQuery.push(...result.data.records)
        if (result.data.records.length > 0) {
          this.form.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      })
    },

    goDetail(id,roomId){
      this.$router.push({
        path:'rentalOrderDetail',
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
  min-height: calc(100vh - 60px);
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
