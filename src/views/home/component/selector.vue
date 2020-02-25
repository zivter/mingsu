<template>
  <div class="timePicker">
    <div class="overflow">
      <span @click="reset" class="reset">重置</span>
    </div>

    <p class="priceTitle">价格范围</p>
    <p class="priceRange">￥0 - ￥5000+</p>
    <vue-slider
    :min='0'
    :max='5000'
    v-model="value"
    :dotStyle='dotStyle'
    :process="process"
    :tooltipStyle='tooltipStyle'
    style="padding:7px 16px;margin:20px 0;"
    :enable-cross="false"></vue-slider>

    <van-divider />

    <van-cell title="人数" :border='false'>
      <template slot="default">
        <van-stepper v-model="LodgerCount" :min='0'/>
      </template>
    </van-cell>
    <van-cell title="床铺数量" :border='false'>
      <template slot="default">
        <van-stepper v-model="BedCount" :min='0'/>
      </template>
    </van-cell>
    <van-cell title="卧室" :border='false'>
      <template slot="default">
        <van-stepper v-model="BedroomCount" :min='0'/>
      </template>
    </van-cell>

    <van-divider />

    <van-button type="danger" round class="saveBtn" @click="onConfirm">确定</van-button>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'selector',
  props: {},
  components:{ VueSlider },
  data(){
    return{
        value: [0, 5000],
        dotStyle:{
          color:'#DA4F53',
          border:'1px solid #DA4F53'
        },
        process: dotsPos => [
          [dotsPos[0], dotsPos[1],{ backgroundColor: '#DA4F53' }]
        ],
        tooltipStyle:{
          backgroundColor:'#DA4F53',
          borderColor:'#DA4F53'
        },
        LodgerCount: 0,
        BedCount: 0,
        BedroomCount: 0
    }
  },
  computed: {

  },
  filters:{
  },
  methods:{
   reset(){
    this.value = [0, 5000]
    this.LodgerCount = 0
    this.BedCount = 0
    this.BedroomCount = 0
  },
   onConfirm(){
     console.log(this.value)
     const param = {
       PriceFrom: this.value[0],
       PriceTo: this.value[1],
       LodgerCount: this.LodgerCount,
       BedCount: this.BedCount,
       BedroomCount: this.BedroomCount
     }
     this.$emit('selectorChange',param)
   }
  }
}
</script>

<style scoped lang='scss'>
.timePicker{
  padding: 0 20px;
}
.reset{
  float: right;
  display: block;
  margin: 16px 16px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  line-height: 21px;
}
.priceTitle{
  font-size: 17px;
  margin: 20px 0 10px 0;
  padding: 0 6px;
}
.priceRange{
  font-size: 15px;
  margin: 16px 0;
  padding: 0 6px;
}
.priceSlider {
  padding-left: 30px;
  padding-right: 30px;
  margin: 10px 0;
}
.timePicker /deep/ .van-cell{
  padding: 10px 10px;
}
.saveBtn{
  width: 80%;
  display: block;
  margin: 10px auto 16px;
}
</style>
