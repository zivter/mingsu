<template>
  <div class="collect">
    <van-row type="flex" justify="space-around" class="collectCard" v-for="item in Math.round(Math.random()*10)" :key="item">
      <van-col span="12" class="collectCardLeft">
        <p>厦门市的整套房子/公寓</p>
        <p>整套公寓    两室1卫3床</p>
        <p>¥1640.86/晚</p>
      </van-col>
      <van-col span="8"><img class="cardListImg" src="@/assets/img/cardList.png" alt=""></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'collect',
  props:  {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {},
  methods:{
  }
}
</script>

<style scoped lang='scss'>
.collect{
  background: #F8F9FB;
  min-height: 100vh;
  padding: 10px 0;
}
.cardListImg{
  width: 125px;
  height: 85px;
  margin-top: 16px;
}
.collectCard{
  background: #fff;
  margin-bottom: 10px;
  height: 120px;
}
.collectCardLeft{
  padding: 20px 0 0 12px;
  p{
    font-size: 12px;
    color: #333;
    line-height: 24px;
  }
  p:nth-child(1){
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }
  p:nth-child(2){
    color: #542813;
  }
}
</style>
