<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="topBG">
        <van-field
          v-model="account.accountNumber"
          label="支付宝账号"
          placeholder="请输入支付宝账号"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          v-model="account.realName"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          v-model="account.idCard"
          label="身份证"
          placeholder="请输入身份证号"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          v-model="extract.amount"
          :placeholder="'可提现 ¥'+account.balance"
          :border="false"
          bind:change="onChange"
          label="提现金额"
          input-class="zfb-input"
        >
          <template slot="button">
            <!-- <van-button @click="withDrawAll" size="mini">全部提现</van-button> -->
            <span class="field-button" style="color:#da4f53;font-size:13px;" @click="withDrawAll">全部提现</span>
            <!-- <div>
              <div class="label-bottom">
                 <span class="field-button"  @click="withDrawAll">全部提现</span>
              </div>
            </div> -->
          </template>
        </van-field>
        <van-field
          v-model="account.phone"
          label="手机号"
          placeholder="请输入手机号码"
          :border="false"
          bind:change="onChange"
        />
        <!-- <van-field
          v-model="account.code"
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
          @click="submit"
          >提交申请</van-button
        >
      </div>
      <p class="withdrawalList" @click="$router.push({ path: '/withdrawHistory' })">提现明细</p>
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
      account: {
        accountNumber: '',
        realName: '',
        phone: '',
        idCard: '',
        balance: 0
      },
      isTesting: false,
      params: {
        zfb: "",
      },
      extract: {
        amount: null
      }
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
    onClickLeft() {
      this.$router.go(-1);
    },
    accountInfo() {
      accountInfo().then((result) => {
        this.account = result.data
      }).catch((err) => {
        this.$notify({ type: 'warning', message: err })
      });
    },
    /** 提交 */
    submit() {
      if(this.account.accountNumber == '' || this.account.accountNumber == null
      || this.account.realName == '' || this.account.realName == null
      || this.account.phone == ''  || this.account.phone == null
      || this.account.idCard == ''  || this.account.idCard == null
      || this.extract.amount == '' || this.account.amount == null) {
        this.$notify({ type: 'warning', message: '请将提现信息填写完整' })
        return
      }
      if(this.extract.amount > this.account.balance) {
        this.$notify({ type: 'warning', message: '请将提现金额填写正确' })
        return
      }
      if(this.account.balance == 0) {
        this.$notify({ type: 'warning', message: '暂无提现额度' })
        return
      }
      const params = {
        accountType: 1,
        accountNumber: this.account.accountNumber,
        realName: this.account.realName,
        phone: this.account.phone,
        idCard: this.account.idCard,
      }
      /** 保存账户信息 */
      accountEdit(params).then((result) => {
      }).catch((err) => {
        this.$notify({ type: 'warning', message: err })
      });
        this.$router.push({ path: '/withdrawSuccess' })
      /** 提现接口 */
      addExtract(this.extract).then((result) => {
        this.$notify({ type: 'success', message: '提现成功' })
      }).catch((err) => {
        this.$notify({ type: 'warning', message: err })
      });
    },
  withDrawAll(){
    this.extract.amount = this.account.balance
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
          color: #da4f53;
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
  .withdrawalList{
    color: #da4f53;
    text-align: center;
    margin-top: 40px;
  }
}
</style>
