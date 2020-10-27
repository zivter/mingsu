<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="topBG">
        <van-field
          :value="account.accountNumber"
          label="到账支付宝"
          placeholder="请输入支付宝账号"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          :value="account.zfb"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          :value="account.zfb"
          placeholder="请输入提现金额1"
          :border="false"
          bind:change="onChange"
          input-class="zfb-input"
        >
          <template slot="label">
            <div>
              <p>提现金额</p>
              <p class="label-icon">¥</p>
              <div class="label-bottom">
                可提现 ¥2000 <span class="field-button">全部提现</span>
              </div>
            </div>
          </template>
        </van-field>
        <van-field
          :value="account.phone"
          label="手机号"
          placeholder="请输入手机号码"
          :border="false"
          bind:change="onChange"
        />
        <!-- <van-field
          :value="account.code"
          label="验证码"
          placeholder="请输入验证码"
          :border="false"
          bind:change="onChange"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            plain
            v-if="isTesting"
            >重新获取</van-button
          >
          <van-button slot="button" size="small" type="primary" plain v-else
            >发送验证码</van-button
          >
        </van-field> -->
      </div>
      <div>
        <van-button
          size="normal"
          class="submit-btn"
          @click="$router.push({ path: '/withdrawHistory' })"
          >提交申请</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { accountInfo, accountEdit } from "@/api/center";
import { addExtract } from "@/api/pokect";

export default {
  name: "withdraw",
  props: {},
  components: {},
  data() {
    return {
      isTesting: false,
      account: {}
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
    this.accountInfo()
  },
  mounted() {},
  methods: {
    accountInfo() {
      accountInfo().then((result) => {
        this.account = result.data
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    }
  },
};
</script>

<style scoped lang="scss">
$btnColor: #da4f53;
$titleColor: #da4f53;
$btnBorderColor: #f7f7f7;
$whiteFontColor: #fff;
$blackFontColor: #000;
$bgColor: #f7f7f7;
$subBgColor: #fff;
.withdraw {
  background: #f8f9fb;
  min-height: 100vh;
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
    position: relative;
    overflow: hidden;
    .van-cell {
      margin-top: 8px;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: bold;
      /deep/ input {
        font-weight: normal;
      }
      /deep/ [input-class="zfb-input"] {
        margin-top: 32px;
        margin-left: -86px;
        width: calc(100% + 86px);
        font-size: 16px;
      }
      .label-icon {
        margin-top: 8px;
        font-weight: normal;
      }
      .label-bottom {
        width: 100%;
        white-space: nowrap;
        font-size: 12px;
        font-weight: normal;
        .field-button {
          color: $btnColor;
        }
      }
    }
  }
  .submit-btn {
    margin: 10px auto;
    background: $btnColor;
    color: $whiteFontColor;
    display: block;
    width: 180px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
  }
}
</style>
