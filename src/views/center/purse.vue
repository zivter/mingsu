<template>
  <div class="Purse">
    <van-nav-bar title="我的钱包" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="topBG">
        <div class="money-box">
          <p class="money">{{ unified.allProfit }}</p>
          <p class="money-text">佣金总收益(元)</p>
        </div>
        <div class="bg-up-card">
          <span class="card-title">可提现金额（元）</span>
          <span class="card-number">{{ unified.balance }}</span>
          <van-button
            plain
            type="primary"
            class="card-btn"
            @click="$router.push({path:'/withdraw'})"
          >提现</van-button>
        </div>
      </div>
      <ul class="btn-list">
        <li>
          <p>待结算佣金</p>
          <p class="btn-number">{{ unified.unsettled }}</p>
        </li>
        <li>
          <p>已提现金额</p>
          <p class="btn-number">{{ unified.extract }}</p>
        </li>
      </ul>
      <ul class="detail-list">
        <purseList></purseList>
      </ul>
    </div>
  </div>
</template>

<script>
import purseList from "./component/purseList";
import { accountUnified, accountInfo } from "@/api/center";

export default {
  name: "Purse",
  props: {},
  components: { purseList },
  data() {
    return {
      unified: {}
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
    this.accountUnified()
    this.accountInfo()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    accountUnified() {
      accountUnified({}).then((result) => {
        this.unified = result.data
      }).catch((err) => {
      })
    },
    accountInfo() {
      accountInfo().then((result) => {
        
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    }
  },
};
</script>

<style scoped lang='scss'>
$btnColor: #da4f53;
$titleColor: #da4f53;
$btnBorderColor: #f7f7f7;
$whiteFontColor: #fff;
$blackFontColor: #000;
$bgColor: #f7f7f7;
$subBgColor: #fff;
.Purse {
  background: #F8F9FB;
  height: 100vh;
}
.orderNav {
  /deep/ .van-tabs__line {
    bottom: 22px;
  }
  /deep/ .van-tab__text {
    font-weight: 700;
  }
}
.container {
  background: $bgColor;
  .topBG {
    background-image: linear-gradient(-90deg, #7d7d8c, #4b4c62);
    background-size: 100% 100%;
    height: 240px;
    position: relative;
    overflow: hidden;
    .money-box {
      position: absolute;
      top: 58px;
      width: 100%;
      color: $whiteFontColor;
      p {
        margin: 0;
      }
      .money {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
      }
      .money-text {
        text-align: center;
        font-size: 13px;
        font-weight: normal;
        line-height: 20px;
      }
    }
    .bg-up-card {
      width: calc(100% - 24px);
      position: relative;
      margin: 160px auto 0;
      background: #fff;
      border-radius: 8px;
      height: 66px;
      .card-title {
        top: 12px;
        left: 12px;
        position: absolute;
        font-size: 14px;
        font-weight: normal;
      }
      .card-number {
        left: 12px;
        bottom: 12px;
        position: absolute;
        font-size: 16px;
        color: #373737;
      }
      .card-btn {
        position: absolute;
        right: 12px;
        top: 20px;
        border-radius: 14px;
        height: 26px;
        line-height: 26px;
        font-size: 13px;
        color: $btnColor;
        border: 1px solid $btnColor;
      }
    }
  }
  .btn-list {
    height: 72px;
    display: flex;
    justify-content: center;
    background: $subBgColor;
    li:not(:first-child) {
      border-left: 1px solid $btnBorderColor;
    }
    li {
      width: 48%;
      text-align: center;
      margin-top: 11px;
      height: 50px;
      p {
        line-height: 25px;
        color: $blackFontColor;
        font-size: 14px;
        font-weight: normal;
      }
    }
    .btn-number {
      color: $btnColor;
      font-size: 18px;
    }
  }
  .detail-list {
    min-height: 100px;
    background: $subBgColor;
    margin-top: 17px;
    overflow: auto;
    height: 100%;
    margin-bottom: 40px;
    &::before {
      content: "收益明细";
      text-align: center;
      font-size: 18px;
      color: $titleColor;
      width: 100%;
      display: inline-block;
      line-height: 40px;
      font-weight: normal;
    }
  }
}
</style>
