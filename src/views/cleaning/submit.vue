<template>
  <div class="order">
    <div class="main">
      <van-field
        v-model="form.name"
        label="姓名"
        label-class='celltitle'
        placeholder="请输入姓名"
        input-align="right"/>
      <van-field
        v-model="form.phone"
        label="联系电话"
        label-class='celltitle'
        placeholder="请输入联系电话"
        input-align="right"/>
      <van-field
        v-model="form.region"
        label="地区"
        label-class='celltitle'
        readonly
        clickable
        placeholder="请输入地区"
        @click="showCityPicker = true"
        input-align="right"/>
      <van-field
        v-model="form.address"
        label="详细地址"
        label-class='celltitle'
        placeholder="请输入详细地址"
        input-align="right"/>
      <van-field
        v-model="form.remark"
        label="备注"
        label-class='celltitle'
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入备注"
        input-align="right"/>
    </div>

    <!-- 预定须知 -->
    <!-- <div class='notice'>
      <p class="noticeTitle">预定须知</p>
      <p class="noticep noticep1">退订规则</p>
      <p class="noticep noticep2">取消订单，扣除全部房费作为违约金支付给房东，如提前离店，扣除 全部剩余房费作为违约金支付给房东。</p>
      <p class="noticep noticep1">入住提示</p>
      <p class="noticep noticep2">房东确认后可向房东索要入住指南，方便您自主入住：平台提供7*24小时客服服务，确保您入住无忧。</p>
      <p class="noticep noticep1">押金提示</p>
      <p class="noticep noticep2">在线支付押金500元，到店后无需再支付，住房押金离店后，如无需扣款，将原方式退还。</p>
    </div> -->

    <!-- 提交订单兰 -->
    <van-submit-bar
      style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
      button-text="提交订单"
      class="submitContent"
      @submit="submit">
      <van-row slot="default" class="defaultC">
        <van-col span="18">
          <div class="defaultCTop">
          </div>
        </van-col>
      </van-row>
    </van-submit-bar>

    <!--城市选择器-->
    <van-popup v-model="showCityPicker" position="bottom">
      <van-area :area-list="areaList" :value="form.regionId" @cancel='showCityPicker = false' @confirm='confirm'/>
    </van-popup>

  </div>
</template>

<script>
import areaList from '@/assets/json/area'
import { CleaningReserveApply } from '@/api/cleaning'

export default {
  name: '',
  props:  {
  },
  components:{ },
  data() {
    return {
      stepperCount:1,
      pricePopupshow:false,
      value:'',
      areaList: areaList,
      form:{
        address:'',
        name:"",
        phone:'',
        regionId:'',
        remark:'',
        form:''
      },
      showCityPicker:false
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
    onClickLeft(){
      this.$router.go(-1)
    },
    submit(){
      CleaningReserveApply(this.form).then((result) => {
        if(result.success) {
          this.$router.push({
            path:'cleaningSuccess'
          })
        }else{
           this.$notify('提示文案');
        }
      }).catch((err) => {
        this.$notify(err);
      })
    },
    confirm(val){
      this.form.regionId = val[2] ? val[2].code : val[1].code
      this.form.region = val.map(item => item.name).join()
      this.showCityPicker = false
    },
  }
}
</script>

<style scoped lang='scss'>
.order{
  background: #F8F9FB;
  padding-top: 20px;
  min-height: 100vh;
}
.main{
  background: #fff;
  border-radius: 8px;
  margin: 0 20px 20px 20px;
  font-size: 13px;
  padding: 0 20px;
}
.main /deep/ .celltitle{
  line-height: 30px;
  font-weight: 700;
}
.defaultC{
  flex: 1;
  font-size: 12px;
  margin-left: 12px;
}
</style>
