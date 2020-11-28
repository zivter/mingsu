<template>
  <div class="order">
    <van-nav-bar
      title="租房详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-swipe indicator-color="white" class="orderImgList" @change="onChange">
        <van-swipe-item>
          <img v-lazy="GLOBAL.imgSrc2+detailData.cover" alt="" class="orderImg">
        </van-swipe-item>
        <van-swipe-item v-for="item in detailData.images" :key="item.id">
          <img v-lazy="GLOBAL.imgSrc2+item.imageName" alt="" class="orderImg">
        </van-swipe-item>
        <template #indicator>
        <div class="custom-indicator" style="color:#fff;font-size:10px">
          <van-icon name="photo-o" size="12" style="top:2px;right:2px"/>{{ current + 1 }}/{{detailData.images.length + 1}}
        </div>
      </template>
      </van-swipe>
      <div class="dBody">
        <!-- 标题简介 -->
        <p class="title1">{{ detailData.title }}</p>
        <p class="title2">{{ detailData.tag }}</p>
        <div class="infoBox">
          <span class="infoBoxPrice">{{ detailData.thirtyAmount }}<span style="font-size:14px;">/月</span></span>
          <span>{{ detailData.houseType }}</span>
          <span>{{ detailData.deposit }}m²</span>
        </div>
      </div>
      <p class="warmTip"> </p>
      <div class="selectContent">
        <van-cell is-link @click="timeradioshow = true" :value="timeradio | timeradioFilter" title="租约时长"/>
        <van-popup v-model="timeradioshow" position="bottom">
          <p class="selectTitle">租约时长</p>
          <van-radio-group v-model="timeradio" v-for="item in detailData.rentLengths" :key="item" @change='radioGroupChange'>
            <van-cell-group>
              <van-cell :title="item+'天'" clickable @click="timeradio = item">
                <template #right-icon>
                  <van-radio :name="item" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          
          <van-button type="danger" class="confirmBtn" size="small" @click="timeradioshow = false">确定</van-button>
        </van-popup>

        <van-cell is-link @click="payradioshow = true" :value="payradio | payradioFilter(timeradio)" title='付款周期'/>
        <van-popup v-model="payradioshow" position="bottom">
          <p class="selectTitle">付款周期</p>
          <van-radio-group v-model="payradio" @change='payradioGroupChange'>
            <van-cell-group v-for="item in detailData.cycles" :key="item">
              <van-cell :title="'每'+item+'天一付'" clickable @click="payradio = item" v-if="!(timeradio == 30 && item == 30)">
                <template #right-icon>
                  <van-radio :name="item" />
                </template>
              </van-cell>
            </van-cell-group>
            <van-cell-group>
              <van-cell title="一次性付清" clickable @click="payradio = timeradio">
                <template #right-icon>
                  <van-radio :name="timeradio" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <van-button type="danger" class="confirmBtn" @click="payradioshow = false">确定</van-button>
        </van-popup>

        <van-cell is-link @click="canlendarShow = true" :value="canlendarBegin" title='租约开始时间'/>
        <van-calendar v-model="canlendarShow"  @confirm="canlendarConfirm" />

        <van-cell is-link @click="stayShow = true" :value="stayInfo.name" title='入住人信息'/>

      </div>
      <div class="infoContent">
        <van-cell :value="'￥'+cycleNum" title='周期租金'/>
        <van-cell :value="timeradio | timeradioFilter" title='租约时长'/>
        <van-cell :value="payradio | payradioFilter" title='付款周期'/>
        <van-cell :value="'￥'+detailData.deposit" title='押金'/>
        <van-cell :value="payradio | allFee1(detailData, timeradio)" title='总租金'/>
        <van-cell :value="payradio | allFee2(detailData, timeradio)" title='合计'/>
      </div>
      <div class="btnContent">
        <p class="btnHeji">合计：{{ payradio | allFee2(detailData, timeradio) }}</p>
        <van-button type="danger" class="confirmBtns" @click="submit">提交订单</van-button>
        <van-button type="danger" class="confirmBtns" @click="contractshow = true">合同预览</van-button>
      </div>
      <!-- 租赁合同 -->
      <van-popup
      v-model="contractshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }">
        <!-- <p class="contractTitle">{{ article.title }}</p> -->
        <p class="contractContent" style="word-break:break-all;white-space: pre-line;padding:10px 16px 30px;" v-html="article"></p>
      </van-popup>
      <!-- 入住人信息 -->
      <van-popup
      v-model="stayShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }">
        <!-- <p class="contractTitle">{{ article.title }}</p> -->
        <occupant @saveOccupant='saveOccupant'/>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { roomInfo } from '@/api/room'
import { getArticle } from '@/api/aboutus'
import { addOrder, orderBill, billFirst } from '@/api/order'
import { accountInfo } from "@/api/center";
import moment from 'moment';
import share from '@/utils/share';
import tokenAuth from '@/utils/tokenAuth';
import Vue from 'vue'
import { Lazyload, Dialog } from 'vant';
import occupant from './component/selectOccupant';

Vue.use(Lazyload);
export default {
  name: '',
  props:  {
  },
  components:{ occupant },
  data() {
    return {
      detailData: {
        images: [],
        dayAmount: '',
        fiveAmount: '',
        tenAmount: '',
        thirtyAmount: '',
        deposit: ''
      },
      current: 0,
      timeradioshow: false,
      payradioshow: false,
      contractshow: false,
      timeradio: '',
      payradio: '',
      article: '',
      firstFee:'',
      canlendarShow: false,
      canlendarBegin: moment().format('YYYY-MM-DD'),
      cycleNum: 0,
      stayInfo: '',
      stayShow: false
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    payradioFilter(val, payradioFilter) {
      if(val > 30 || (val && payradioFilter == val)) {
        return '一次性付清'
      } else {
        return val === '' ? '' : '每'+val+'天一付'
      }
    },
    timeradioFilter(val) {
      return val === '' ? '' : val+'天'
    },
    payradioPay(val, detailData) {
      if(val) {
        return '￥'+ detailData.thirtyAmount * (val/30)
      }
    },
    allFee1(payradio, detailData, timeradio) {
      if(payradio) {
        return '￥'+(timeradio/payradio)*detailData.thirtyAmount * (payradio/30)
      }
    },
    allFee2(payradio, detailData, timeradio) {
      if(payradio) {
        return '￥'+((timeradio/payradio)*detailData.thirtyAmount * (payradio/30) +detailData.deposit)
      }
    }
  },
  created() {
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query);
    this.getArticle()
    this.roomInfo()
  },
  mounted() {},
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    submit(){
      if(this.payradio === '' || this.timeradio === '' || this.canlendarBegin === '') {
        this.$notify({ type: 'danger', message: '请将选择支付周期,租赁时长和开始租赁日期' });
        return
      }
      Dialog.confirm({
        title: '温馨提示',
        message: '房屋租期为'+this.timeradio/30+'月份，押金'+this.detailData.deposit+'元，支付方式微信，请先支付押金与第一付款周期费用，合计'+(this.detailData.deposit+this.detailData.cycleNum)+'元',
      })
        .then(() => {
          // on confirm
          const param = {
            lodgersId: this.stayInfo.id,
            orderType: 1,
            roomId: this.$route.query.id,
            cycle: this.payradio == this.timeradio ? 0 : this.payradio,
            rentLength: this.timeradio,
            beginTime: this.canlendarBegin,
            peopleCount: 1,
          }
          //** 提交订单获取bid */
          addOrder(param).then((result) => {
            if(result.success) {
              const orderParam = {
                oid: result.data
              }
              this.billFirst(orderParam)
            }
          }).catch((err) => {
            this.$notify({ type: 'danger', message: err });
          });
        })
        .catch(() => {
          this.$notify({ type: 'info', message: '已取消' });
        });
    },
    /** 首次调用bill */
    billFirst(orderParam) {
      billFirst(orderParam).then((result) => {
        if(result.success) {
          const orderParams = {
            bid: result.data.id
          }
          this.orderBill(orderParams)
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    },
    //** 根据bid获取支付的信息 */
    orderBill (orderParam){
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
            const ctag = Cookies.get('ctag');
            if (ctag) {
              Cookies.remove('ctag')
            }
            that.$router.push({
              path: 'rentOrderSuccess'
            })
          } 
        }
      ); 
    },
    /**
     * 获取客房详情
     */
    roomInfo(){
      roomInfo({id: this.$route.query.id}).then((result) => {
        if(result.success == true){
          this.detailData = result.data
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    },
    onChange(index) {
      this.current = index;
    },
    /** 租赁合同 */
    getArticle() {
      const param = {
        type: 4
      }
      getArticle(param).then((result) => {
        this.article = result.data.article
        this.accountInfo()
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /** 租约时长改变 */
    radioGroupChange(val) {
      this.payradio = ''
      if(this.canlendarBegin != '' && this.timeradio != '' && this.payradio != '') {
          this.article = this.article.replace('{5}', moment(this.canlendarBegin).add(this.timeradio, 'd').format('YYYY-MM-DD HH:mm:ss'))
          this.article = this.article.replace('{6}', '')
          this.article = this.article.replace('{7}', this.timeradio)
          this.article = this.article.replace('{8}', this.cycleNum)
          this.article = this.article.replace('{9}', this.detailData.deposit + this.cycleNum)
          this.article = this.article.replace('{10}', moment(this.canlendarBegin).format('YYYY-MM-DD HH:mm:ss'))
        }
    },
    /** 周期时间改变 */
    payradioGroupChange(val) {
      switch (val) {
        case 1:
          this.cycleNum = this.detailData.dayAmount
          break;
        case 5:
          this.cycleNum = this.detailData.fiveAmount
          break;
        case 10:
          this.cycleNum = this.detailData.tenAmount
          break;
        case 30:
          this.cycleNum = this.detailData.thirtyAmount
          break;
        default:
          this.cycleNum = this.detailData.allAmount
          break;
      }
      if(this.canlendarBegin != '' && this.timeradio != '' && this.payradio != '') {
        this.article = this.article.replace('{5}', moment(this.canlendarBegin).add(this.timeradio, 'd').format('YYYY-MM-DD HH:mm:ss'))
        this.article = this.article.replace('{6}', '')
        this.article = this.article.replace('{7}', this.timeradio)
        this.article = this.article.replace('{8}', this.cycleNum)
        this.article = this.article.replace('{9}', this.detailData.deposit + this.cycleNum)
        this.article = this.article.replace('{10}', moment(this.canlendarBegin).format('YYYY-MM-DD HH:mm:ss'))
      }
    },
    /** 日历确认 */
    canlendarConfirm(data) {
      this.canlendarShow = false
      this.canlendarBegin = moment(data).format('YYYY-MM-DD HH:mm:ss')
    },
    /** 账户信息 获取等级 */
    accountInfo() {
      accountInfo().then((result) => {
        this.article = this.article.replace('{0}', result.data.realName)
        this.article = this.article.replace('{1}', '男')
        this.article = this.article.replace('{2}', result.data.idCard)
        this.article = this.article.replace('{3}', result.data.phone)
        this.article = this.article.replace('{4}', this.canlendarBegin != '' ? moment(this.canlendarBegin).format('YYYY-MM-DD HH:mm:ss') : '')
        if(this.canlendarBegin != '' && this.timeradio != '' && this.payradio != '') {
          this.article = this.article.replace('{5}', moment(this.canlendarBegin).add(this.timeradio, 'd').format('YYYY-MM-DD HH:mm:ss'))
          this.article = this.article.replace('{6}', this.cycleNum)
          this.article = this.article.replace('{7}', this.timeradio)
          this.article = this.article.replace('{8}', this.cycleNum)
          this.article = this.article.replace('{9}', this.detailData.deposit + this.cycleNum)
          this.article = this.article.replace('{10}', moment(this.canlendarBegin).format('YYYY-MM-DD HH:mm:ss'))
        }

      }).catch((err) => {
        this.$notify({ type: 'warning', message: err })
      });
    },
    /** 保存入住人 */
    saveOccupant(result) {
      this.stayInfo = result
      this.stayShow = false
    }
  },
}
</script>

<style scoped lang='scss'>
$bgColor: #F5F5F5;
$btnColor: #DA4F53;
.order{
  background: $bgColor;
  padding-bottom: 60px;
}
.orderImgList{
  width: 100%;
  height: 56.4vw;
}
.orderImg{
  width: 100%;
  height: 56.4vw;
}
.dBody{
  padding: 10px 20px;
  color: #333;
  background: #fff;
  .title1{
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
  .title2{
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
  }
  .infoBox{
    font-weight: 700;
    margin-top: 12px;
    span{
      margin-right: 10px;
    }
    .infoBoxPrice{
      color: $btnColor;
      font-size: 22px;
    }
  }
}
.warmTip{
  color: $btnColor;
  font-size: 11px;
  padding: 10px 16px;
  text-align: left;
}
.selectTitle{
  line-height: 50px;
  font-size: 14px;
  text-align: center;
}
.confirmBtn{
  width: 300px;
  margin: 30px auto;
  display: block;
  text-align: center;
}
.infoContent{
  margin-top: 20px;
}
.btnContent{
  background: #fff;
  overflow: hidden;
  padding-bottom: 16px;
  .btnHeji{
    float: left;
    margin-left: 16px;
    line-height: 32px;
    color: $btnColor;
  }
  .confirmBtns{
    float: right;
    margin-right: 10px;
    display: block;
    width: 100px;
    background: $btnColor;
    border-radius: 3px;
    line-height: 24px;
    height: 32px;
  }
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
</style>
