<template>
  <div class="marketing">
    <van-nav-bar title="营销中心" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <van-divider style="color:#fff">邀请方式</van-divider>
      <p>
        方法： 
        通过专属二维码分享给身边的朋友，只需对方通过识别专属二维码后，注册登录“浙拾光”，24小时内Ta将成为您的专属粉丝，24小时Ta产生的订单，您将会得到一笔不菲的佣金收益，会自动计入您的账户中！
      </p>
      <qrcode class="qrcode" :value="'https://www.shigvg77.cn/tow/scanning/h5/add?superior='+tokenId" :options="{ width: 250 }"></qrcode>
      <van-button type="primary" class="saveBtn" @click="downloadPic">长按二维码保存图片</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';

Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "Marketing",
  props: {},
  components: {},
  data() {
    return {
      tokenId: window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    downloadPic() {

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
.marketing {
  background: #333333;
  min-height: 100vh;
}
.container{
  padding: 20px 40px 80px;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
}
.qrcode{
  margin: 20px auto;
  display: block;
}
.saveBtn{
  width: 80%;
  display: block;
  margin: auto;
  // margin-bottom: 50px;
  // background: $btnColor;
  // border-color: $btnColor;
  color: #fff;
}
</style>
