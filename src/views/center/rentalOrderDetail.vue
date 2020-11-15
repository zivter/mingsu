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
        <van-cell title="租约时长">
          <template #default>
            {{ orderData.beginTime | timeFilter }}~{{ orderData.endTime | timeFilter }} ({{ orderData.rentLength }} 天)
          </template>
        </van-cell>
        <van-cell title="付款周期" :value="orderData.cycle+'天'" />
        <van-cell title="押金" :value="'￥'+orderData.orderDetails[1].amount" />
        <van-cell title="总租金" :value="'￥'+orderData.orderDetails[1].amount" />
        <van-cell title="合计" :value="'￥'+(orderData.orderDetails[1].amount + orderData.orderDetails[0].amount)" />
      </div>
      <p class="warmTip" @click="contractShow = true">查看租赁合同</p>
      <van-tabs v-model="tabActive" type="card">
        <van-tab title="未支付">
          <van-radio-group v-model="payradio" ref="checkboxGroup" @change="checkboxChange">
            <van-radio :name="index" class="payList" v-for="(item, index) in billData1" :key="index">
              <div class="payListTop">
                <div class="payListTopL">
                  ￥{{ item.payAmount }}
                  <span>房屋租金</span>
                </div>
                <div class="payListTopR">
                  未支付
                </div>
              </div>
              <div class="payListBtm">
                <span class="payListBtmL">{{ item.beginTime | timeFilter }}-{{ item.endTime | timeFilter }}</span>
                <span class="payListBtmR">{{ item.beginTime | timeFilter }}前</span>
              </div>
            </van-radio>
          </van-radio-group>
        </van-tab>
        <van-tab title="已支付">
          <div class="payList" v-for="item in billData2" :key="item">
            <div class="payListTop">
              <div class="payListTopL">
                ￥{{ item.payAmount }}
                <span>房屋租金</span>
              </div>
              <div class="payListTopR">
                已支付
              </div>
            </div>
            <div class="payListBtm">
              <span class="payListBtmL">{{ item.beginTime | timeFilter }}-{{ item.endTime | timeFilter }}</span>
              <span class="payListBtmR">{{ item.beginTime | timeFilter }}前</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 提交订单兰 -->
      <van-submit-bar
        style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
        button-text="提交订单"
        v-if="tabActive === 0"
        class="submitContent"
        @submit="submit">
        <van-row slot="default" class="defaultC">
          <van-col span="14">
          </van-col>
          <van-col span="10" class="priceDetail" >合计：￥{{ totalAmount }}</van-col>
        </van-row>
      </van-submit-bar>

    </div>
    <!-- 租赁合同 -->
    <van-popup
    v-model="contractShow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <p class="contractTitle">{{ article.title }}</p>
      <p class="contractContent">{{ article.article }}</p>
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
import { orderInfo, billList, orderBill } from '@/api/order'
import { getArticle } from '@/api/aboutus'
export default {
  name: 'RentalOrderDetail',
  props: {
  },
  components:{},
  data() {
    return {
      orderData: {},
      tabActive: 0,
      billData: {},
      contractShow: false,
      article: {},
      billData1: [],
      billData2: [],
      payradio: '',
      totalAmount: ''
    }
  },
  computed: {},
  watch: {},
  filters: {
    timeFilter(val) {
      return moment(val).format('YYYY.MM.DD')
    }
  },
  created() {
    this.orderInfo()
    this.billList()
    this.getArticle()
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
        this.$notify({type:'warning',message:err})
      });
    },
    /** 账单详情 */
    billList() {
      const params = {
        oid: this.$route.query.id,
        page: 1,
        limit: 1000
      }
      billList(params).then((result) => {
        this.billData1 = []
        this.billData2 = []
        result.data.records.forEach(element => {
          if(element.payState === 0) {
            this.billData1.push(element)
          } else {
            this.billData2.push(element)
          }
        });
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /** 租赁合同 */
    getArticle() {
      const param = {
        type: 4
      }
      getArticle(param).then((result) => {
        this.article = result.data
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
		onClickLeft(){
      this.$router.go(-1)
    },
    /** 提交按钮 */
    submit() {
      if(this.payradio === '') {
        this.$notify({type:'warning',message:'请选择待支付的订单'})
        return
      }
      //** 根据bid获取支付的信息 */
      const orderParam = {
        bid: this.billData1[this.payradio].id
      }
      orderBill(orderParam).then((result) => {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady(result.data);
        }
      }).catch((errs) => {
        this.$notify({ type: 'danger', message: errs });
      });
    },
    /**调用微信支付api */
    onBridgeReady(jsApiParameters){
      var that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: jsApiParameters.appId,
          nonceStr: jsApiParameters.nonceStr,
          package: jsApiParameters.packageValue,
          paySign: jsApiParameters.sign,
          signType: jsApiParameters.signType,
          timeStamp: jsApiParameters.timeStamp
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.$router.push({
              path: 'rentOrderSuccess'
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
    },
    selectAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    checkboxChange(list) {
      // this.totalAmount = eval(this.payradio.map(item => {
      //   return this.billData1[item].payAmount
      // }).join('+')).toFixed(1)
      this.totalAmount = this.billData1[list].payAmount
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
$pColor: #666;
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
.contractTitle{
  text-align: center;
  margin: 20px 0;
  font-weight: 700;
}
.contractContent{
  text-indent: 2em;
  padding: 6px 10px;
}
/deep/ .van-radio__label{
  flex: 1;
}
.payList{
  background: #fff;
  padding: 8px 10px 4px;
  margin-bottom: 6px;
  .payListTop{
    overflow: hidden;
  }
  .payListTopL{
    float: left;
    font-size: 16px;
    span{
      color: $pColor;
      font-size: 12px;
    }
  }
  .payListTopR{
    float: right;
    color: $btnColor;
    font-size: 13px;
  }
  .payListBtm{
    color: $pColor;
    font-size: 13px;
    overflow: hidden;
  }
  .payListBtmL{
    float: left;
  }
  .payListBtmR{
    float: right;
  }
}
.defaultC{
  width: 100%;
}
.van-cell__title{
  flex: 0.5;
}
</style>
