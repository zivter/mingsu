<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text left-arrow @click-left="onClickLeft" />
    <div class="container">
      <withdrawHistoryList></withdrawHistoryList>
    </div>
  </div>
</template>

<script>
import withdrawHistoryList from "./component/withdrawHistoryList.vue";
export default {
  name: "withdrawHistory",
  props: {},
  components: { withdrawHistoryList },
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
.container {
  background: $bgColor;
}
</style>
