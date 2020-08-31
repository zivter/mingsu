<template>
  <div class="cleaning">
    <div class="cleanTop">
      <img src="@/assets/img/cleaningBg.png" alt="" style="width:100%;height:100%;">
    </div>
    <div class="cleanTitle">
      <p class="p1">拾光管家，让生活更自由</p>
      <p class="p2">生活不只是生活，生活需要分享欣赏</p>
      <p class="p2">事业不只是事业，事业需要互相帮助</p>
      <p class="p2">拾光管家提供专业的保洁服务、专属的运营管理</p>
      <p class="p2">让你的生活和事业，变得更加的轻松</p>
    </div>
    <p class="cleanP">一、基础保洁</p>
    <div class="serveContent">
      <van-row justify="space-around">
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>地面/桌台清洁</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>生活垃圾清理</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>装饰物摆放归位</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>床品更换/清洗</span></van-col>
      </van-row>
      <p class="serveWarn">厨房清理不包含瓜果蔬菜残渣及碗筷清洗服务， 额外收费标准50元/次</p>
    </div>
    <p class="cleanP">二、深度保洁</p>
    <div class="serveContent">
      <van-row justify="space-around">
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>基础保洁+</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>屋内玻璃/窗台清理</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>门框/扶手清理</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>基础家电清理除味</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>沙发/桌椅清理保养</span></van-col>
      </van-row>
      <p class="serveWarn">根据拾光管家现场核算定价， 价格区间为100-300元/间</p>
    </div>
    <p class="cleanP">三、价格标准</p>
    <div class="serveContent">
      <van-row justify="space-around">
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>客厅/卧室</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>10元/间</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>厨房/卫生间</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>10元/套</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>大面积+</span></van-col>
        <van-col span="12" class="serveCol"><van-icon name="checked" /><span>20元/套</span></van-col>
      </van-row>
    </div>
    <p class="cleanP">四、保洁流程</p>
    <div class="serveContent serveSteps">
      <p>1 点击拾光管家服务</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>2 填写信息</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>3 提交订单信息</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>4 拾光管家专属联系</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>5 确认订单并支付</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>6 分配保洁人员上门服务</p>
      <p><img src="@/assets/img/arrow.png" alt=""></p>
      <p>7 拾光管家确认服务结果</p>
    </div>
    <van-button type="danger" round class="saveBtn" @click="cleaningBook">立即预约</van-button>
  </div>
</template>

<script>
import share from '@/utils/share';
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
    share.share(this.$route.meta.title);
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
  padding-bottom: 150px;
}
.cleanTop{
  height: 227px;
  img{
    height: 100%;
  }
}
.cleanTitle{
    line-height: 30px;
    text-align: center;
    margin-top: 30px;
  .p1{
    color: #DA4F53;
    font-size: 15px;
    font-weight: 700;
  }
  .p2{
    font-size: 13px;
  }
}
.cleanP{
  font-weight: 700;
  text-align: center;
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
  bottom: 70px;
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
.serveContent{
  background: #F7F6F6;
  margin: 0 30px;
  border-radius: 10px;
  padding: 20px 0;
  .serveCol{
    margin: 10px 0;
    font-size: 13px;
    .van-icon{
      color: #DA4F53;
      margin-right: 10px;
      font-size: 16px;
      margin-left: 20px;
    }
  }
  .serveWarn{
    color: #DA4F53;
    border: 1px solid #DA4F53;
    border-radius: 5px;
    margin: 10px 20px 0;
    padding: 5px 15px;
    font-size: 14px;
    line-height: 24px;
  }
}
.serveSteps{
  p{
    text-align: center;
  }
  img{
    height: 20px;
    width: 20px;
    margin: 6px 0;
  }
}
</style>
