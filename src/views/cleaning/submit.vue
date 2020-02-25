<template>
  <div class="order">
    <div class="main">
      <div class="cellphone">
        <p class="float-left title">姓名</p>
        <p class="float-right"><van-field input-align='right' v-model="form.name" class="cellInp" placeholder="请输入姓名" /></p>
      </div>
      <div class="cellphone">
        <p class="float-left title">联系电话</p>
        <p class="float-right"><van-field input-align='right' v-model="form.phone" class="cellInp" placeholder="请输入联系电话" /></p>
      </div>
      <div class="cellphone">
        <p class="float-left title">地区</p>
        <p class="float-right">
          <van-field
            readonly
            clickable
            input-align='right'
            :value="form.region"
            placeholder="请输入地区"
            @click="showCityPicker = true" />
        </p>
      </div>
      <div class="cellphone">
        <p class="float-left title">详细地址</p>
        <p class="float-right"><van-field input-align='right' v-model="form.address" class="cellInp" placeholder="请输入详细地址" /></p>
      </div>
      <div class="cellphone">
        <p class="float-left title">备注</p>
        <p class="float-right">
          <van-field
          v-model="form.remark"
          input-align='right'
          rows="1"
          autosize
          class="cellInp"
          type="textarea"
          placeholder="请输入备注"/>
        </p>
      </div>
    </div>

    <!-- 预定须知 -->
    <div class='notice'>
      <p class="noticeTitle">预定须知</p>
      <p class="noticep noticep1">退订规则</p>
      <p class="noticep noticep2">取消订单，扣除全部房费作为违约金支付给房东，如提前离店，扣除 全部剩余房费作为违约金支付给房东。</p>
      <p class="noticep noticep1">入住提示</p>
      <p class="noticep noticep2">房东确认后可向房东索要入住指南，方便您自主入住：平台提供7*24小时客服服务，确保您入住无忧。</p>
      <p class="noticep noticep1">押金提示</p>
      <p class="noticep noticep2">在线支付押金500元，到店后无需再支付，住房押金离店后，如无需扣款，将原方式退还。</p>
    </div>

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
  .dateTop{
    overflow: hidden;
    line-height: 60px;
    font-weight: 700;
  }
  .dateBtm{
    background: #f9f9f9;
    border-radius: 6px;
    padding: 12px 6px;
    .dateTotal{
      color: #DA4F53;
      background: #F9E4E5;
      text-align: center;
      border-radius: 5px;
      margin-top: 20px;
      font-size: 12px;
      line-height: 20px;
    }
    .dateTime{
      line-height: 30px;
      font-size: 17px;
      font-weight: 700
    }
    .right{
      text-align: right;
    }
    .dateExplain{
      color: #B4B4B4;
      font-size: 12px;
      line-height: 24px;
    }
  }
  .personCount{
    overflow: hidden;
    line-height: 50px;
  }
  .title{
    font-weight: 700;
  }
  .person{
    overflow: hidden;
    line-height: 50px;
    
  }
  .cellphone{
    overflow: hidden;
    line-height: 50px;
    .cellInp{
      margin-top: 3px;
    }
  }
  
}
.addPersonBtn{
  border-radius: 100px;
  font-size: 12px;
  line-height: 22px;
  height: 24px;
  background: #DA4F53;
}
.redbag{
  background: #F9E4E5;
  border-radius: 8px;
  margin: 20px;
  font-size: 13px;
  height: 40px;
  box-sizing: border-box;
  .redbagBtn{
    line-height: 40px;
    margin-right: 20px;
  }
  .redbagIcon{
    height: 24px;
    width: 28px;
    display: block;
    background: url('../../assets/img/redbag.png') no-repeat center;
    background-size: 100%;
    margin:8px 20px 0 16px;
  }
  .redbagP{
    line-height: 40px;
    font-size: 13px;
    color: #DA4F53;
  }
}
.remark{
  background: #fff;
  border-radius: 8px;
  font-size: 13px;
  height: 70px;
  box-sizing: border-box;
  .remarkP{
    line-height:70px;
    font-size:13px;
    margin-left:20px;
  }
}
.notice{
  padding: 20px 20px 80px 20px;
}
.noticeTitle{
  margin: 20px 0;
}
.noticep{
  color: #B4B4B4;
}
.noticep1{
  font-size: 13px;
}
.noticep2{
  font-size: 12px;
  margin-bottom: 20px;
}

.defaultC{
  flex: 1;
  font-size: 12px;
  margin-left: 12px;
  .announce{
    color: #666;
  }
  .defaultCTop{
    .price{
      color: #DA4F53;
      font-size: 16px;
    }
    .perNight{
      margin: 0 8px;
    }
    .discount{
      background: #F9E4E5;
      color: #DA4F53;
    }
  }
  .priceDetail{
    padding: 10px 0 0 10px;
    color: #DA4F53;
  }
}
</style>
