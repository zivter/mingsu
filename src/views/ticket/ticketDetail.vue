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
      <p class='detailPrice'>￥{{ ticketDetail.minPrice }}220 <span class='detailPricespan'> / 起</span></p>
      <div class='overflow detailRefer'>
        <p class='float-left'>参考门市价¥{{ ticketDetail.tickets[1] ? ticketDetail.tickets[1].price : 0 }}</p>
        <p class='float-right'>已售123245件</p>
      </div>
      <div class="overflow detailCondition">
        <div class='float-left'><van-icon color='#DA4F53' :name="ticketDetail.needReservation ? 'passed' : 'close'" />随买随用</div>
        <div class='float-left'><van-icon color='#DA4F53' :name="ticketDetail.ticketReturnSupport ? 'close' : 'passed'" />不可退</div>
        <div class='float-left'><van-icon color='#DA4F53' :name="ticketDetail.needPrint ? 'close' : 'passed'" />无需取票</div>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 预定说明 -->
      <div class="notice">
        <p class="contentTitle" style="margin-bottom:16px;">预定说明</p>
        <cell-components cell-name='在线押金'>
          <template slot='right'>
            <p class='dangerInfo'>随买随用</p>
            <p class="dangerBtm">最晚需在<span style='color:#DA4F53'>出行当天20:00</span>前购买</p>
          </template>
        </cell-components>
        <cell-components cell-name='有效时间' cell-value='选择的使用日期当天有效' cell-color='#000' />
        <cell-components cell-name='出票速度' cell-value='平均23秒出票' cell-color='#000' />
        <cell-components cell-name='适用条件' cell-value='身高：1.4米（不含）以上' cell-color='#000' />
        <cell-components cell-name='限购政策' cell-value='每单最多可购5份' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}" />
      <!-- 费用说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">费用说明</p>
        <cell-components cell-name='费用说明' cell-value='上海迪士尼乐园1日成人票1张不包含《美女与野兽》音乐剧演出票' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}" />
      <!-- 使用说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">使用说明</p>
        <cell-components cell-name='使用方法' cell-color='#000' >
          <template slot='right'>
            <p class='dangerInfo'>无需取票，快速入园</p>
            <p class="dangerBtm">凭有效证件直接验证入园</p>
          </template>
        </cell-components>
        <cell-components cell-name='入园时间' cell-value='09:00-20:00' cell-color='#DA4F53' />
        <cell-components cell-name='入园地址' cell-value='上海浦东新区迪士尼乐园-入口' cell-color='#DA4F53' />
        <cell-components cell-name='补充说明' cell-value='入园时，购票时登记的有效证件持有人本人必须在场，且需与该订单上的所有同行游客一同入园' cell-color='#000' />
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 退改说明 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">退改说明</p>
        <cell-components cell-name='退改规则' cell-color='#000' >
          <template slot='right'>
            <p class='dangerInfo'>不可退</p>
            <p class="dangerBtm">该产品一经预定成功，不支持退改，敬请谅解。</p>
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
            <p>1、入园时请出示您的门票，每票只限一人当日一次入园使用。</p>
            <p>2、享受相关优惠时，请出示相关证明文件和有效证件，持儿童票的游客应当至少由一名持成人票的游客监护入园。</p>
          </template>
        </cell-components>
        <cell-components cell-name='供应商' cell-color='#000' >
          <template slot='right'>
            <p>万程（上海）旅行社有限公司</p>
            <p>许可证编号：L-SH-WZ00016</p>
          </template>
        </cell-components>
      </div>
      <!-- 底部 -->
      <van-submit-bar :price="130*100" label=' ' style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;" suffix-label='/晚' button-text="立即预定" @submit="chooseType">
        <div slot="default" class="defaultC">
          <svg-icon icon-class='#icon-dianhua' class="defaultIcon" font-size="24px" />
          <span class="defaultSpan">客服热线</span>
        </div>
      </van-submit-bar>
      <!-- 价格 -->
      <van-popup
        v-model="priceShow"
        position="bottom"
        class="pricePop"
        :style="{ height: '34%' }">
        <van-radio-group v-model="priceRadio">
          <van-cell-group>
            <van-cell clickable @click="priceRadio = '1'" class="priceCell">
              <div slot="title">
                <span>平日价格</span><span><span style='font-size:12px;'>￥</span>288</span>
              </div>
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell clickable @click="priceRadio = '2'" class="priceCell">
              <div slot="title">
                <span>周末价格</span><span><span style='font-size:12px;'>￥</span>388</span>
              </div>
              <van-radio slot="right-icon" name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button color="#DA4F53" round style='width:100%;margin-top:16px;'>确定</van-button>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import svgIcon from '@/components/SvgIcon/index'
  import cellComponents from '@/components/cellComponents/index'
  import { TouristAttractionQueryGetDetail } from '@/api/ticket'

  export default {
    name: 'detail',
    props: {},
    components: {
      svgIcon,
      cellComponents
    },
    data() {
      return {
        ticketDetail: {},
        priceShow: false,
        priceRadio:null
      }
    },
    computed: {},
    watch: {},
    filters: {},
    created() {
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
}
</style>