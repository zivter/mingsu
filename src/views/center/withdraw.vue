<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="topBG">
        <van-field
          :value="params.zfb"
          label="到账支付宝"
          placeholder="请输入支付宝账号"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          :value="params.zfb"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :border="false"
          bind:change="onChange"
        />
        <van-field
          :value="params.zfb"
          placeholder="请输入提现金额"
          :border="false"
          bind:change="onChange"
        >
          <template slot="label">
            <div>
              <p>提现金额</p>
              <p>¥</p>
            </div>
          </template>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "withdraw",
  props: {},
  components: {},
  data() {
    return {
      params: {
        zfb: "",
      },
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
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
    }
  }
}
</style>
