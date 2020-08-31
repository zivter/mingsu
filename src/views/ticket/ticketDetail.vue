<template>
  <div class="ticketDetail">
    <div class="dHeader">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="32px"
        class='backBtn'
        @click="$router.go(-1)"/>
    </div>
    <img :src="GLOBAL.imgSrc+ticketDetail.coverImage" alt="" class='bannerImg'>
    <div class="dBody">
      <!-- 标题简介 -->
      <p class="title1">{{ ticketDetail.title }}</p>
      <p class='detailPrice'>￥{{ ticketDetail.minPrice }} <span class='detailPricespan'> / 起</span></p>
      <div class='overflow detailRefer'>
        <p class='float-left'>参考门市价¥{{ ticketDetail.suggestPrice }}</p>
        <p class='float-right'>已售{{ ticketDetail.salesCount }}件</p>
      </div>
      <div class="overflow detailCondition">
        <div class='float-left'><van-icon color='#DA4F53' name="passed" />{{ ticketDetail.needReservation ? '需要预定' : '随买随用' }}</div>
        <div class='float-left'><van-icon color='#DA4F53' :name="ticketDetail.ticketReturnSupport ? 'close' : 'passed'" />不可退</div>
        <div class='float-left'><van-icon color='#DA4F53' :name="ticketDetail.needPrint ? 'close' : 'passed'" />无需取票</div>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 预定说明 -->
      <div class="notice">
        <p class="contentTitle" style="margin-bottom:16px;">预定说明</p>
        <cell-components cell-name='在线押金'>
          <template slot='right'>
            <p class='dangerInfo'>{{ ticketDetail.needReservation ? '需要预定' : '随买随用' }}</p>
            <p class="dangerBtm">最晚需在<span style='color:#DA4F53'>出行当天{{ ticketDetail.usageTime ? ticketDetail.usageTime.split('-')[1] : '' }}</span>前购买</p>
          </template>
        </cell-components>
        <cell-components cell-name='有效时间' cell-value='选择的使用日期当天有效' cell-color='#000' />
        <cell-components cell-name='出票速度' cell-value='平均20秒出票' cell-color='#000' />
        <cell-components cell-name='适用条件' cell-value='身高：1.4米（不含）以上' cell-color='#000' />
        <cell-components cell-name='限购政策' cell-value='每单最多可购5份' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}" />
      <!-- 费用说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">费用说明</p>
        <cell-components cell-name='费用说明' :cell-value='ticketDetail.feeRemark' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}" />
      <!-- 使用说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">使用说明</p>
        <cell-components cell-name='使用方法' cell-color='#000' >
          <template slot='right'>
            <p class='dangerInfo'>{{ ticketDetail.usageRemark }}</p>
          </template>
        </cell-components>
        <cell-components cell-name='入园时间' :cell-value='ticketDetail.usageTime' cell-color='#DA4F53' />
        <cell-components cell-name='入园地址' :cell-value='ticketDetail.regionFullName' cell-color='#DA4F53' />
        <cell-components cell-name='补充说明' :cell-value='ticketDetail.usageRemark' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 退改说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">退改说明</p>
        <cell-components cell-name='退改规则' cell-color='#000' >
          <template slot='right'>
            <p class='dangerInfo'>{{ ticketDetail.ticketReturnSupport ? '可退' : '不可退' }}</p>
            <p class="dangerBtm" v-if="!ticketDetail.ticketReturnSupport">该产品一经预定成功，不支持退改，敬请谅解。</p>
          </template>
        </cell-components>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 其他须知-->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">其他须知</p>
        <cell-components cell-name='发票说明' cell-value='如需发票，请在游玩结束次日登录最新版本的携程旅行手机客户端，或点击携程确认短信中的查看订单详情链接，在订单详情页中申请，发票金额不含优惠券或礼品卡支付部分。' cell-color='#000' />
        <cell-components cell-name='其他须知' cell-color='#000' >
          <template slot='right'>
            <p>{{ ticketDetail.otherRemark }}</p>
          </template>
        </cell-components>
        <cell-components cell-name='供应商' cell-color='#000' >
          <template slot='right'>
            <p>{{ ticketDetail.supplier }}</p>
          </template>
        </cell-components>
      </div>
      <!-- 底部 -->
      <van-submit-bar :price="ticketDetail.minPrice*100" label=' ' style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;" suffix-label='/晚' button-text="立即预定" @submit="chooseType">
        <!-- <div slot="default" class="defaultC">
          <svg-icon icon-class='#icon-dianhua' class="defaultIcon" font-size="24px" />
          <span class="defaultSpan">客服热线</span>
        </div> -->
      </van-submit-bar>
      <!-- 价格 -->
      <van-popup
        v-model="priceShow"
        position="bottom"
        class="pricePop">
        <van-radio-group v-model="priceRadio">
          <van-cell-group>
            <!-- <van-cell v-for="item,index in ticketDetail.tickets" clickable  @click="priceRadio = item.ticketSpecId" class="priceCell"> -->
            <van-cell v-for="(item,index) in ticketDetail.tickets" clickable :key="index"  @click="ticketSelect(item)" class="priceCell">
              <div slot="title">
                <span>{{ item.ticketSpecName }}</span><span><span style='font-size:12px;'>￥</span>{{ item.price }}</span>
              </div>
              <van-radio slot="right-icon" :name='item.ticketSpecId' />
            </van-cell>
            <!-- <van-cell clickable @click="priceRadio = '2'" class="priceCell">
              <div slot="title">
                <span>周末价格</span><span><span style='font-size:12px;'>￥</span>388</span>
              </div>
              <van-radio slot="right-icon" name="2" />
            </van-cell> -->
          </van-cell-group>
        </van-radio-group>
        <div class="payQrCode">
          <img :src="GLOBAL.imgSrc+payQrCode" alt="">
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import cellComponents from '@/components/cellComponents/index'
  import { TouristAttractionQueryGetDetail } from '@/api/ticket'
  import tokenAuth from '@/utils/tokenAuth';
  import share from '@/utils/share';

  export default {
    name: 'detail',
    props: {},
    components: {
      cellComponents
    },
    data() {
      return {
        ticketDetail: {},
        priceShow: false,
        priceRadio:null,
        payQrCode:''
      }
    },
    computed: {},
    watch: {},
    filters: {},
    created() {
      share.share(this.$route.meta.title);
      tokenAuth.getAuth(this.$route.query, 'ticket');
      this.TouristAttractionQueryGetDetail()
    },
    mounted() {},
    methods: {
      /**
       * 跳转到订单页
       */
      chooseType() {
        this.priceShow = true
      },
      //获取门票详情
      TouristAttractionQueryGetDetail() {
        const param = {
          id: this.$route.query.id
        }
        TouristAttractionQueryGetDetail(param).then((result) => {
          this.ticketDetail = result.result
        }).catch((err) => {}).finally(() => {});
      },
      priceRadioChoose(item){
        this.priceRadio = item.ticketSpecId
      },
      ticketSelect(item){
        this.priceRadio = item.ticketSpecId
        this.payQrCode = item.payQrCode
      }
    }
  }
</script>

<style scoped lang='scss'>
.ticketDetail {
  padding-bottom: 80px;
}

.dangerInfo {
  border: 1px solid #DA4F53;
  border-radius: 2px;
  background: #F9E4E5;
  line-height: 22px;
  height: 22px;
  font-size: 13px;
  padding: 0 8px;
  display: inline-block;
}
.dangerBtm{
  margin-top: 10px;
}

.dHeader {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  overflow: hidden;
  width: 100%;
  .backBtn {
    float: left;
    display: block;
    margin: 10px 0 0 8px;
  }
}

.bannerImg {
  height: 227px;
  width: 100%;
}

.dBody {
  padding: 10px 20px;
  color: #333;
  .title1 {
    font-size: 24px;
    line-height: 40px;
    font-family: 'PingFangSC-Regular';
    font-weight: 700;
    color: #333;
  }
  .detailPrice {
    color: #DA4F53;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    .detailPricespan {
      color: #000;
      font-size: 12px;
      font-weight: 500;
    }
  }
  .detailRefer {
    color: #B4B4B4;
    font-size: 13px;
    line-height: 24px;
    margin-top: 6px;
  }
  .detailCondition {
    font-size: 12px;
    margin-top: 12px;
    .van-icon {
      font-size: 18px;
      top: 4px;
      margin-right: 3px;
    }
    .float-left {
      margin-right: 10px;
    }
  }
  .contentTitle {
    margin-top: 16px;
    font-size: 15px;
    color: #000;
    font-weight: 700;
  }
  .timeRange {
    margin-top: 20px;
    padding-bottom: 10px;
    .timeRangeT {
      color: #8D8D8D;
      font-size: 13px;
    }
    .timeRangeTitle2 {
      text-align: right;
    }
    .timeRangeAll {
      color: #8D8D8D;
      font-size: 13px;
      line-height: 40px;
    }
    .timeRangeTime {
      color: #333;
      font-size: 17px;
      margin-top: 4px;
      font-weight: 700;
    }
    .timeRangeTime span {
      font-size: 13px;
    }
    .timeRangeTime2 {
      text-align: right;
    }
  }
  .detail {
    .detailContent {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #000;
      line-height: 24px;
      margin-top: 10px;
    }
    .detailHandleClick {
      color: #DA4F53;
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
    }
  }
  .amap-wrapper {
    margin: 20px 0;
    width: 100%;
    height: 120px;
  }
  .defaultC {
    margin-left: 6px;
  }
  .defaultIcon {
    margin: 0 10px;
  }
  .defaultSpan {
    display: block;
    text-align: cell;
    font-size: 12px;
  }
}
.pricePop{
  .van-cell::after{
    border: none;
  }
  [class*=van-hairline]::after{
    border: none;
  }
  padding: 20px 20px 10px;
  box-sizing: border-box;
  .priceCell{
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
    padding: 10px;
    span:nth-child(1){
      font-size: 16px;
    }
    span:nth-child(2){
      color:#DA4F53;
      margin-left:10px;
    }
  }
  .payQrCode{
    height: 200px;
    img{
      margin: 0 auto;
      width: 160px;
      height: 160px;
      margin-top: 20px;
      display: block;
    }
  }
}
</style>