<template>
  <div class="detail">
    <van-nav-bar
      title="租房订单详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="dBody">
      <img class="rentImg" :src="GLOBAL.imgSrc2+orderData.cover">
      <p class="rentTitle">{{ orderData.roomTitle }}</p>
      <p class="warmTip">温馨提示：押金将会在租期完结后自动回退之付款账户</p>
      <div class="infoContent">
        <van-cell title="周期租金" :value="'￥'+(orderData.orderDetails[0].amount/orderData.rentLength)*orderData.cycle" />
        <van-cell title="租约时长" :value="orderData.rentLength+'天'" />
        <van-cell title="付款周期" :value="orderData.cycle+'天'" />
        <van-cell title="押金" :value="'￥'+orderData.orderDetails[1].amount" />
        <van-cell title="总租金" :value="'￥'+orderData.orderDetails[1].amount" />
        <van-cell title="合计" :value="'￥'+(orderData.orderDetails[1].amount + orderData.orderDetails[0].amount)" />
      </div>
      <p class="warmTip">查看租赁合同</p>
      <van-tabs v-model="tabActive"  type="card">
        <van-tab title="未支付">未支付</van-tab>
        <van-tab title="已支付">已支付</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { orderInfo } from '@/api/order'

export default {
  name: 'RentalOrderDetail',
  props: {
  },
  components:{},
  data() {
    return {
      orderData: {},
      tabActive: 0
    }
  },
  computed: {},
  watch: {},
  filters: {
  },
  created() {
    this.orderInfo()
  },
  mounted() {
  },
  methods:{
    /**
     * 订单详情
     */
    orderInfo(){
      const params = {
        id: this.$route.query.id
      }
      orderInfo(params).then((result) => {
        this.orderData = result.data
      }).catch((err) => {
      });
    },
		onClickLeft(){
      this.$router.go(-1)
    },
    /** H5请求订单支付 */
    orderPayRequest(){
      const param = {
        orderNumber: this.orderData.orderNumber
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
      var that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', JSON.parse(jsApiParameters),
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.$router.push({
              path: 'orderSuccess'
            })
          } 
        }
      ); 
    },
    /**取消支付 */
    orderCancel() {
      const param = {
        id: this.orderData.id
      }
      orderCancel(param).then((result) => {
        if (result.success) {
          this.$notify({type:'success',message:'退订成功'});
          location.reload()
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
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
.dBody{
  background: $bgColor;
  padding-bottom: 60px;
}
.rentImg{
  width: 100%;
  height: 230px;
}
.rentTitle{
  font-weight: 700;
  line-height: 24px;
  font-size: 15px;
  padding: 8px 16px;
  background: #fff;
}
.warmTip{
  color: $btnColor;
  font-size: 11px;
  padding: 10px 16px;
  text-align: center;
}
.infoContent{
  background: #fff;
}
/deep/ .van-tabs__nav--card{
  margin: 0;
}
</style>
