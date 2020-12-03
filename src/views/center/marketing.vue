<template>
  <div class="marketing">
    <van-nav-bar title="营销中心" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <img src="@/assets/img/invitePng.png" alt="" class="tuiguangimg" v-if="imgUrl === ''">
      <img :src="imgUrl" alt="" class="tuiguangimg" v-else>
      <van-button type="primary" class="saveBtn" @click="downloadPic">长按图片保存二维码</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { advertScanning } from '@/api/center';

Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "Marketing",
  props: {},
  components: {},
  data() {
    return {
      tokenId: window.localStorage.getItem('tokenId') ? window.localStorage.getItem('tokenId') : '',
      imgUrl: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
    this.advertScanning()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    downloadPic() {

    },
    advertScanning() {
      const param = {
        superior: this.tokenId
      }
      advertScanning(param).then((result) => {
        this.imgUrl = result.data
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
.marketing {
  background: #333333;
  height: calc(100vh - 44px);
}
.container{
  color: #fff;
  font-size: 13px;
  background-size: 100%;
  line-height: 18px;
  height: calc(100vh - 94px);
}
.tuiguangimg{
  width: 100%;
  height: 100%;
}
.qrcode{
  margin: 20px auto;
  display: block;
}
.saveBtn{
  width: 80%;
  display: block;
  margin: auto;
  position: fixed;
  bottom: 12vh;
  left: 0;
  right: 0;
  // margin-bottom: 50px;
  // background: $btnColor;
  // border-color: $btnColor;
  color: #fff;
}
</style>
