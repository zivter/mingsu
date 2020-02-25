<template>
  <div class="order">
    <!-- <van-nav-bar
      title="订单填写"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <div class="main">
      <div class="dateTop">
        <p class="float-left">入离时间</p>
        <p class="float-right" @click="timePopupshow = true">修改时间<van-icon name="arrow" color="#666"/></p>
      </div>

      <van-row gutter="10" class="dateBtm" @click="timePopupshow = true">
        <van-col span="9">
          <p class="dateTime dateStart">{{ timeRangeInfo.from }}</p>
          <p class="dateExplain">{{ timeRangeInfo.fromWeek | weekFilter }}14:00后入住</p>
        </van-col>
        <van-col span="6">
          <p class="dateTotal">共{{ timeRangeInfo.total }}晚</p>
        </van-col>
        <van-col span="9" class="right">
          <p class="dateTime dateEnd">{{ timeRangeInfo.to }}</p>
          <p class="dateExplain">{{ timeRangeInfo.toWeek | weekFilter }}14:00后入住</p>
        </van-col>
      </van-row>

      <div class="person">
        <p class="float-left title">入住人</p>
        <p class="float-right"><van-button type="danger" class="addPersonBtn" @click="personPopupshow = true">选择入住人</van-button></p>
      </div>

      <div class="personList" v-for="personItem in userLodgerIdList" :key="personItem.id">
        <p>{{ personItem.name }}</p>
        <p>{{ personItem.identityNumberType }}:{{ personItem.identityNumber }}</p>
      </div>

      <div class="cellphone">
        <p class="float-left title">联系电话</p>
        <p class="float-right"><van-field input-align='right' v-model="buyerPhone" class="cellInp" placeholder="用于接收订单信息" /></p>
      </div>
    </div>
    <!-- 红包 -->
    <div class="redbag">
      <i class="redbagIcon float-left"></i>
      <p class="float-left redbagP">领取优惠券</p>
      <p class="float-right redbagBtn"><van-button type="danger" class="addPersonBtn" @click="couponPopupshow = true">立即领取</van-button></p>
    </div>

    <!-- 备注 -->
    <div class="remark">
      <p class="float-left remarkP">备注</p>
      <p class="float-right">
        <van-field
          rows="2"
          autosize
          v-model="remark"
          type="textarea"
          placeholder="请输入备注"
          show-word-limit/>
      </p>
    </div>

    <!-- 预定须知 -->
    <div class='notice'>
      <p class="noticeTitle">预定须知</p>
      <p class="noticep noticep1">退订规则</p>
      <p class="noticep noticep2">取消订单，扣除全部房费作为违约金支付给房东，如提前离店，扣除 全部剩余房费作为违约金支付给房东。</p>
      <p class="noticep noticep1">入住提示</p>
      <p class="noticep noticep2">房东确认后可向房东索要入住指南，方便您自主入住：平台提供7*24小时客服服务，确保您入住无忧。</p>
      <p class="noticep noticep1">押金提示</p>
      <p class="noticep noticep2">在线支付押金500元，到店后无需再支付，住房押金离店后，如无需扣款，将原方式退还。</p>
    </div>

    <!-- 提交订单兰 -->
    <van-submit-bar
      style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
      button-text="提交订单"
      class="submitContent"
      @submit="submit">
      <van-row slot="default" class="defaultC">
        <van-col span="18">
          <div class="defaultCTop">
            <span class="price">￥{{ paymentDetail.payment }}</span>
            <span class="perNight">/晚</span>
            <!-- <span class="discount">已减131</span> -->
          </div>
          <p class="announce">{{ paymentDetail.details | DepositFilter }}</p>
        </van-col>
        <van-col span="6" class="priceDetail" @click="pricePopupshow = true">明细<van-icon name="arrow-down" style="top:3px;"/></van-col>
      </van-row>
    </van-submit-bar>

    <!-- 价格明细 -->
    <van-popup
    v-model="pricePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <price-detail :paymentDetail='paymentDetail'/>
    </van-popup>

    <!-- 时间 -->
    <van-popup
    v-model="timePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <time-picker :timeRange='timeRange' @saveTimeRange='saveTimeRange'/>
    </van-popup>

    <!-- 添加入住入 -->
    <van-popup
    v-model="personPopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <person-picker v-if="personPopupshow" @saveOccupant='saveOccupant' :userLodgerIdList='userLodgerIdList'/>
    </van-popup>

    <!-- 优惠券领取 -->
    <van-popup
    v-model="couponPopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <coupon-get v-if="couponPopupshow" />
    </van-popup>


  </div>
</template>

<script>
import priceDetail from './component/priceDetail'
import timePicker from '@/components/timePicker/index'
import { orderReserve, orderReserveConfirm, orderPayRequest } from '@/api/order'
import { GetAvailableList } from '@/api/coupon'

import personPicker from './component/selectOccupant';
import couponGet from './component/couponGet';
import moment from 'moment';

export default {
  name: '',
  props:  {
  },
  components:{ priceDetail, timePicker, personPicker, couponGet },
  data() {
    return {
      stepperCount:1,
      pricePopupshow:false,
      value:'',
      timePopupshow: false,
      personPopupshow: false,
      couponPopupshow:false,
      userLodgerIdList:[],
      buyerPhone:'',
      remark:'',
      timeRange:'',
      timeRangeInfo:{
        from:'入住时间',
        to:'退房时间',
        toL:'',
        fromWeek:'',
        toWeek:'',
        total:''
      },
      paymentDetail:{},
      orderNumber:'',
      couponAvailableList:[]
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    weekFilter(val){
      if(val){
        const weekday = ["七","一","二","三","四","五","六"]
        return '周' + weekday[val]
      }
    },
    DepositFilter(val){
      if(val){
        var Deposit = ''
        val.forEach(element => {
          if(element.type == 'Deposit'){
            Deposit = '含押金¥' + element.unitPrice + '(可退)'
          }
        });
        return Deposit
      }
      
    }
  },
  created() {
    this.timeRange = this.$route.query.timeRange
    this.timeFomate()
    this.GetAvailableList()
  },
  mounted() {},
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    submit(){
      if(this.buyerPhone == ''){
        this.$notify({type:'warning',message:'请输入用于接收的联系电话'})
        return
      }
      if(this.userLodgerIdList.length == 0){
        this.$notify({type:'warning',message:'请选择入住人'})
        return
      }
      var userLodgerIdList = []
      this.userLodgerIdList.forEach(item => {
         userLodgerIdList.push(item.id)
      })
      const param = {
        roomId: this.$route.query.id,
        from: this.timeRangeInfo.from,
        to: this.timeRangeInfo.toL,
        userLodgerIdList: userLodgerIdList,
        buyerPhone: this.buyerPhone,
        remark: this.remark
      }
      orderReserve(param).then((result) => {
        this.orderNumber = result.result.orderNumber
        this.$notify({type:'success',message:'提交订单成功'})
        this.orderPayRequest()
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /** H5请求订单支付 */
    orderPayRequest(){
      const param = {
        orderNumber: this.orderNumber
      }
      orderPayRequest(param).then((result) => {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady(result.result.jsApiParameters);
        }
        
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /**调用微信支付api */
    onBridgeReady(jsApiParameters){
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', JSON.parse(jsApiParameters),
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } 
        }
      ); 
    },

    setTimePicker(){
      
    },
    handleAddOccupant(){
      this.$router.push({
        path:'./selectOccupant'
      })
    },
    saveOccupant(val){
      this.userLodgerIdList = val
      this.personPopupshow = false
    },
    /**
     * 获取价格明细
     */
    orderReserveConfirm(){
      const param = {
        roomId: this.$route.query.id,
        from: this.timeRangeInfo.from,
        to: this.timeRangeInfo.toL,
      }
      orderReserveConfirm(param).then((result) => {
        this.paymentDetail = result.result
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    timeFomate(){
      console.log(this.timeRange)
      if(this.timeRange){
        this.timeRangeInfo = {
          from: moment(this.timeRange.split(',')[0]).format('MM月DD日'),
          to: moment(this.timeRange.split(',')[1]).format('MM月DD日'),
          toL: moment(this.timeRange.split(',')[1]).subtract(1,'d').format('MM月DD日'),
          fromWeek:moment(this.timeRange.split(',')[0]).weekday(),
          toWeek:moment(this.timeRange.split(',')[1]).weekday(),
          total:moment(this.timeRange.split(',')[1]).day()-moment(this.timeRange.split(',')[0]).day()
        }
        this.orderReserveConfirm()
      }
    },
    /**接受子组件传来的时间 */
    saveTimeRange(val){
      this.timeRange = val
      this.timeFomate()
      this.timePopupshow = false
    },
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
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.order{
  background: #F8F9FB;
  padding-top: 1px;
}
.main{
  background: #fff;
  border-radius: 8px;
  margin: 20px;
  font-size: 13px;
  padding: 16px 20px;
  .dateTop{
    overflow: hidden;
    line-height: 60px;
    font-weight: 700;
  }
  .dateBtm{
    background: #f9f9f9;
    border-radius: 6px;
    padding: 12px 6px;
    .dateTotal{
      color: #DA4F53;
      background: #F9E4E5;
      text-align: center;
      border-radius: 5px;
      margin-top: 20px;
      font-size: 12px;
      line-height: 20px;
    }
    .dateTime{
      line-height: 30px;
      font-size: 17px;
      font-weight: 700
    }
    .right{
      text-align: right;
    }
    .dateExplain{
      color: #B4B4B4;
      font-size: 12px;
      line-height: 24px;
    }
  }
  .personCount{
    overflow: hidden;
    line-height: 50px;
  }
  .title{
    font-weight: 700;
  }
  .person{
    overflow: hidden;
    line-height: 50px;
    
  }
  .cellphone{
    overflow: hidden;
    line-height: 50px;
    .cellInp{
      margin-top: 3px;
    }
  }
  
}
.addPersonBtn{
  border-radius: 100px;
  font-size: 12px;
  line-height: 22px;
  height: 24px;
  background: #DA4F53;
}
.redbag{
  background: #F9E4E5;
  border-radius: 8px;
  margin: 20px;
  font-size: 13px;
  height: 40px;
  box-sizing: border-box;
  .redbagBtn{
    line-height: 40px;
    margin-right: 20px;
  }
  .redbagIcon{
    height: 24px;
    width: 28px;
    display: block;
    background: url('../../assets/img/redbag.png') no-repeat center;
    background-size: 100%;
    margin:8px 20px 0 16px;
  }
  .redbagP{
    line-height: 40px;
    font-size: 13px;
    color: #DA4F53;
  }
}
.remark{
  background: #fff;
  border-radius: 8px;
  margin: 20px;
  font-size: 13px;
  height: 70px;
  box-sizing: border-box;
  .remarkP{
    line-height:70px;
    font-size:13px;
    margin-left:20px;
  }
}
.notice{
  padding: 20px 20px 80px 20px;
}
.noticeTitle{
  margin: 20px 0;
}
.noticep{
  color: #B4B4B4;
}
.noticep1{
  font-size: 13px;
}
.noticep2{
  font-size: 12px;
  margin-bottom: 20px;
}

.defaultC{
  flex: 1;
  font-size: 12px;
  margin-left: 12px;
  .announce{
    color: #666;
  }
  .defaultCTop{
    .price{
      color: #DA4F53;
      font-size: 16px;
    }
    .perNight{
      margin: 0 8px;
    }
    .discount{
      background: #F9E4E5;
      color: #DA4F53;
    }
  }
  .priceDetail{
    padding: 10px 0 0 10px;
    color: #DA4F53;
  }
}
.personList{
  background: #F9F9F9;
  margin: 10px 0;
  padding: 10px 24px;
  line-height: 22px;
  border-radius: 6px;
  p:nth-child(1){
    font-size: 13px;
  }
  p:nth-child(2){
    font-size: 11px;
    color: #B4B4B4;
  }

}
</style>
