<template>
  <div class="cleaning">
    <div class="cleanTop">
      <img src="@/assets/img/cleanBg.png" alt="" style="width:100%;height:100%;">
    </div>
    <p class="cleanP">最专业的保洁团队</p>
    <p class="cleanIntro">“保洁”一词源字英文“House Keeping”。英文简称“HK”。保洁服务已经越来越被大家接受和需要，并已经进入了千家万户的生活中。是人们提升现代生活质量的一个里程碑。它使人们的居住环境的质量不断提高。同时也是全民生活水平提升的一个重要证明</p>
    <p class="cleanP">服务流程</p>
    <div class="process">
      <div class="processBox">
        <p class="round">1</p>
        <p class="processP">申请服务</p>
      </div>
      <van-icon name="arrow" class=""/>
      <div class="processBox">
        <p class="round">2</p>
        <p class="processP">涂家收单</p>
      </div>
      <van-icon name="arrow" class=""/>
      <div class="processBox">
        <p class="round">3</p>
        <p class="processP">上门保洁</p>
      </div>
      <van-icon name="arrow" class=""/>
      <div class="processBox">
        <p class="round">4</p>
        <p class="processP">客户验收</p>
      </div>
    </div>
    <van-button type="danger" round class="saveBtn" @click="cleaningBook">立即预约</van-button>
  </div>
</template>

<script>
export default {
  name: '',
  props:  {
  },
  components:{ },
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
    cleaningBook(){
      this.$router.push({
        path:'submit'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.cleaning{
  background: #fff;
  min-height: 100vh;
}
.cleanTop{
  height: 227px;
  img{
    height: 100%;
  }
}
.cleanP{
  font-weight: 700;
  font-size: 15px;
  margin: 20px 20px;
}
.cleanIntro{
  margin: 10px 20px;
  font-size: 13px;
}
.saveBtn{
  width: 80%;
  display: block;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
}
.process{
  display: flex;
  justify-content: space-around;
  padding: 0 30px;
  .processBox{
    width: 60px;
    font-size: 13px;
  }
  .round{
    border: 1px solid #DA4F53;
    border-radius: 50%;
    background: #FDE3E5;
    width: 23px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    font-size: 12px;
    margin: 0 auto;
  }
  .processP{
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
  }
}
</style>
