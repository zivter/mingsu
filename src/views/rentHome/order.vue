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
          <span class="infoBoxPrice">{{ detailData.thirtyAmount }}<span style="font-size:14px;">/晚</span></span>
          <span>{{ detailData.houseType }}</span>
          <span>{{ detailData.deposit }}m²</span>
        </div>
      </div>
      <div class="selectContent">
        <van-cell is-link @click="timeradioshow = true" :value="timeradio | timeradioFilter" title="租约时长"/>
        <van-popup v-model="timeradioshow" position="bottom">
          <p class="selectTitle">租约时长</p>
          <van-radio-group v-model="timeradio" v-for="item in timeList" :key="item">
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

        <van-cell is-link @click="payradioshow = true" :value="payradio | payradioFilter" title='付款周期'/>
        <van-popup v-model="payradioshow" position="bottom">
          <p class="selectTitle">付款周期</p>
          <van-radio-group v-model="payradio" v-for="item in payList" :key="item">
            <van-cell-group>
              <van-cell :title="'每'+item+'天一付'" clickable @click="payradio = item">
                <template #right-icon>
                  <van-radio :name="item" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <van-button type="danger" class="confirmBtn" @click="payradioshow = false">确定</van-button>
        </van-popup>
      </div>
      <div class="infoContent">
        <van-cell :value="payradio | payradioPay(detailData)" title='周期租金'/>
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
      <van-popup v-model="contractshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }">
        <contract />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { roomInfo } from '@/api/room'
import { addOrder } from '@/api/order'

import contract from './component/contract'
import moment from 'moment';
import share from '@/utils/share';
import tokenAuth from '@/utils/tokenAuth';
import Vue from 'vue'
import { Lazyload, Dialog } from 'vant';

Vue.use(Lazyload);
export default {
  name: '',
  props:  {
  },
  components:{ contract },
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
      timeList: [30, 90, 180, 360],
      payList: [1, 5, 10, 30],
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    payradioFilter(val) {
      return val === '' ? '' : '每'+val+'天一付'
    },
    timeradioFilter(val) {
      return val === '' ? '' : val+'天'
    },
    payradioPay(val, detailData) {
      if(val === 1) {
        return '￥'+ detailData.dayAmount
      } else if(val === 5) {
        return '￥'+ detailData.fiveAmount
      } else if(val === 10) {
        return '￥'+ detailData.tenAmount
      } else if(val === 30) {
        return '￥'+ detailData.thirtyAmount
      }
    },
    allFee1(payradio, detailData, timeradio) {
      if(payradio === 1) {
        return '￥'+(timeradio/payradio)*detailData.dayAmount
      } else if(payradio === 5) {
        return '￥'+(timeradio/payradio)*detailData.fiveAmount
      } else if(payradio === 10) {
        return '￥'+(timeradio/payradio)*detailData.tenAmount
      } else if(payradio === 30) {
        return '￥'+(timeradio/payradio)*detailData.thirtyAmount
      }
    },
    allFee2(payradio, detailData, timeradio) {
      if(payradio === 1) {
        return '￥'+((timeradio/payradio)*detailData.dayAmount+detailData.deposit)
      } else if(payradio === 5) {
        return '￥'+((timeradio/payradio)*detailData.fiveAmount+detailData.deposit)
      } else if(payradio === 10) {
        return '￥'+((timeradio/payradio)*detailData.tenAmount+detailData.deposit)
      } else if(payradio === 30) {
        return '￥'+((timeradio/payradio)*detailData.thirtyAmount+detailData.deposit)
      }
    }
  },
  created() {
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query);
    this.roomInfo()
  },
  mounted() {},
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    submit(){
      if(this.payradio === '' || this.timeradio === '') {
        this.$notify({ type: 'danger', message: '请将选择支付周期和租赁时长' });
        return
      }
      Dialog.confirm({
        title: '温馨提示',
        message: '房屋租期为X月份，押金XXX元，支付方式XXXX，请先支付押金与第一付款周期费用，合计XXXXX元',
      })
        .then(() => {
          // on confirm
          const param = {
            lodgersId: window.localStorage.getItem('tokenId'),
            orderType: 1,
            roomId: this.$route.query.id,
            cycle: this.payradio,
            rentLength: this.timeradio,
            beginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            peopleCount: 1,
            
          }
          addOrder(param).then((result) => {
            debugger
          }).catch((err) => {
            this.$notify({ type: 'danger', message: err });
          });
        })
        .catch(() => {
          this.$notify({ type: 'info', message: '已取消' });
        });
    },
    viewContract() {

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
  }
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
  height: 320px;
}
.orderImg{
  width: 100%;
  height: 320px;
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
.selectContent{
  margin-top: 20px;
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
</style>
