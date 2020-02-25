<template>
  <div class="detail">
    <div class="dHeader">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="32px"
        class='backBtn'
        @click="$router.go(-1)"/>
      <van-icon
        :name="likeHeart==false?'like-o':'like'"
        :color="likeHeart==false?'#fff':'red'"
        size="32px"
        class="heartBtn"
        @click="likeHeartClick"/>
    </div>
    <van-swipe :autoplay="3000" indicator-color="white" class="dSwiper">
      <van-swipe-item v-for="item in detailData.images" :key="item.id">
        <img :src="GLOBAL.imgSrc+item.imageUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="dBody">
      <!-- 标题简介 -->
      <p class="title1">{{ detailData.roomStyleName }}</p>
      <p class="title2">{{ detailData.title }}</p>
      <van-row gutter="20" class="info">
        <van-col span="8"><svg-icon icon-class='#icon-ren'/>{{ detailData.lodgerCount }}位房客</van-col>
        <van-col span="16"><svg-icon icon-class='#icon-men'/>{{ detailData.bedroomCount }}间卧室</van-col>
        <van-col span="8"><svg-icon icon-class='#icon-Bed'/>{{ detailData.bedCount }}张床</van-col>
        <van-col span="16"><svg-icon icon-class='#icon-Toilet'/>{{ detailData.bathroomCount }}间卫生间</van-col>
      </van-row>
      <!-- 框框 -->
      <van-row type="flex" justify="space-between" class="infoBox">
        <van-col span='11'>
          <svg-icon icon-class='#icon-Bed' class="float-left"/>
          <div class="float-left">
            <p class="p1">卧室1</p>
            <p>1张特大号床</p>
          </div>
        </van-col>
        <van-col span='11'>
          <svg-icon icon-class='#icon-sofa' class="float-left"/>
          <div class="float-left">
            <p class="p1">客厅/公共区域</p>
            <p>1张沙发</p>
          </div>
        </van-col>
      </van-row>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 入住时间 -->
      <van-row type="flex" justify="space-between" class="timeRange" @click="handleTimePickerClick()">  
        <van-col span="8">
          <p class="timeRangeT">入住</p>
          <p class="timeRangeTime">{{ timeRangeInfo.from }}<span>{{ timeRangeInfo.fromWeek | weekFilter }}</span></p>
        </van-col>
        <van-col span="3" class="timeRangeAll">共{{ timeRangeInfo.total }}晚</van-col>
        <van-col span="8">
          <p class="timeRangeT timeRangeTitle2">退房</p>
          <p class="timeRangeTime timeRangeTime2"><span>{{ timeRangeInfo.toWeek | weekFilter }}</span> {{ timeRangeInfo.to }}</p>
        </van-col>
      </van-row>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 详情 -->
      <div class="detail">
        <p class="contentTitle">详情</p>
        <p class="detailContent">{{ detailData.description }}</p>
        <p href="" class="detailHandleClick" @click="handleIntroClick">查看详情>></p>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 位置 -->
      <div class="map">
        <p class="contentTitle">位置</p>
        <div class="amap-wrapper">
          <el-amap
          class="amap-box"
          :vid="'amap-vue'"
          :center="detailData.locationMap | mapFilter"
          :position="center"
          :zoom="zoom"></el-amap>
        </div>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 设施 -->
      <div class="facilities">
        <p class="contentTitle">设施</p>
        <van-grid
        :gutter="10"
        :border='false'
        style="margin-top:10px;">
          <van-grid-item
            v-for="(item,index) in facilitiesList"
            :key="item.iconName"
            :text="item.label"
            @click="handleServiceClick(index)">
            <template slot="icon">
              <svg-icon
              :icon-class='item.iconName'
              font-size="22px"
              style="margin-bottom:10px;"/>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 预定须知 -->
      <div class="notice">
        <p class="contentTitle" style="margin-bottom:16px;">预定须知</p>
        <cell-components
        cell-name='在线押金'
        :cell-value='detailData.deposit+"元"'
        cell-color='#000'/>
        <cell-components
        cell-name='保洁费'
        :cell-value='detailData.cleaningCost+"元"'
        cell-color='#000'/>
        <cell-components
        cell-name='退订规则'
        cell-value='取消订单，收取定金的100%作为违约金支付给 房东（由房东制定）'
        cell-color='#DA4F53'/>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 入住须知 -->
      <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">入住须知</p>
        <cell-components
        cell-name='入住时间'
        cell-value='14:00后入住，12:00前退房'
        cell-color='#000'/>
        <cell-components
        cell-name='接待时间'
        cell-value='08:00-22:00'
        cell-color='#000'/>
        <cell-components
        cell-name='卫生打扫'
        cell-value='1客1扫'
        cell-color='#000'/>
      </div>
      <!-- 提交订单兰 -->
      <van-submit-bar
        :price="roomSelectPrice*100"
        label=' '
        style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
        suffix-label='/晚'
        button-text="立即预定"
        @submit="skipToOrder">
        <div slot="default" class="defaultC">
          <svg-icon icon-class='#icon-dianhua' class="defaultIcon" font-size="24px"/>
          <span class="defaultSpan">客服热线</span>
        </div>
        <span slot="tip" v-if="btnError">
          你的收货地址不支持同城送, <span>修改地址</span>
        </span>
      </van-submit-bar>
    </div>
    <!-- 设施服务 -->
    <van-popup
    v-model="servicePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <service/>
    </van-popup>

    <!-- 房源介绍 -->
    <van-popup
    v-model="introPopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <intro/>
    </van-popup>

    <!-- 时间 -->
    <van-popup
    v-model="timePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <time-picker @saveTimeRange='saveTimeRange'/>
    </van-popup>


  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon/index'
import cellComponents from '@/components/cellComponents/index'
import timePicker from '@/components/timePicker/index'
import service from './service'
import intro from './intro'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import moment from 'moment'
import { GetDetail, GetIdleDatesByDateRange } from '@/api/roomsQuery'
import { GetPrices } from '@/api/room'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f0c98a84e1c9266ebb51ee5316ee74b5',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


export default {
  name: 'detail',
  props: {
  },
  components:{ svgIcon, cellComponents, service, intro, timePicker },
  data() {
    return {
      detailData:{},
      facilitiesList:[
        {label:'床',iconName:'#icon-Bed'},
        {label:'热水',iconName:'#icon-HotWater'},
        {label:'沙发',iconName:'#icon-sofa'},
        {label:'电视',iconName:'#icon-TV'},
        {label:'洗浴用品',iconName:'#icon-BathroomAmenities'},
        {label:'无线网络',iconName:'#icon-Wifi'},
        {label:'空调',iconName:'#icon-AirConditioner'},
        {label:'更多',iconName:'#icon-xinzeng'},
      ],
      likeHeart: false,
      zoom: 12,
      center: [121.555509, 29.869503],
      address: '',
      btnError: false,
      servicePopupshow: false,
      introPopupshow: false,
      timeRange:'',
      timeRangeInfo:{
        from:'入住时间',
        to:'退房时间',
        fromWeek:'',
        toWeek:'',
        total:''
      },
      timePopupshow:false,
      roomSelectPrice:''
    }
  },
  computed: {},
  watch: {},
  filters: {
    mapFilter(val){
      if(val){
        var list = []
        val.split(',').forEach(element => {
          list.push(Number(element))
        })
        list.reverse()
        return list
      }
    },
    weekFilter(val){
      if(val){
        const weekday = ["七","一","二","三","四","五","六"]
        return '周' + weekday[val]
      }
    }
  },
  created() {
    this.GetDetail()
    this.timeRange = this.$route.query.timeRange
    this.timeFomate()
    this.GetPrices(1)
  },
 mounted() {
  },
  methods:{
    /**
     * 获取客房详情
     */
    GetDetail(){
      GetDetail(this.$route.query.id).then((result) => {
        if(result.success == true){
          this.detailData = result.result
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    },
    /**
     * 点击收藏
     */
    likeHeartClick(){
      this.likeHeart = !this.likeHeart
    },
    onSubmit(){
      this.btnError = !this.btnError
    },
    /**
     * 打开设施服务
     */
    handleServiceClick(index){
      if(index == 7){
        this.servicePopupshow = true;
      }
    },
    // 打开房源介绍
    handleIntroClick(){
      this.introPopupshow = true
    },
    /**
     * 跳转到订单页
     */
    skipToOrder(data){

      this.$router.push({
        path:'order',
        query:{
          id:this.$route.query.id,
          timeRange: this.timeRange
        }
      })
    },
    /**
     * 选择日期
     */
    handleTimePickerClick(){
      this.timePopupshow = true
      this.GetIdleDatesByDateRange()
      this.GetPrices(0)
    },
    /**获取可选择日期 */
    GetIdleDatesByDateRange(){
      const param = {
        Id: this.$route.query.id,
        from: moment().format('YYYY-MM-DD'),
        to: moment().month(+6).format('YYYY-MM-DD'),
      }
      GetIdleDatesByDateRange(param).then((result) => {
        
      }).catch((err) => {
        
      });
    },
    /**获取价格 */
    GetPrices(type){
      const param = {
        RoomId: this.$route.query.id,
        From: type == 1 ? this.timeRangeInfo.from : moment().format('YYYY-MM-DD'),
        To: type == 1 ? this.timeRangeInfo.to : moment().month(+6).format('YYYY-MM-DD')
      }
      GetPrices(param).then((result) => {
        if(result.success){
          if(type == 1){
            this.roomSelectPrice = this.get_object_first_attribute(result.result.prices)
          }
        }
      }).catch((err) => {
        
      });
    },
    get_object_first_attribute(data){
      for (var item in data)
      console.log(data[item])
        return data[item]
    },
    timeFomate(){
      if(this.timeRange){
        this.timeRangeInfo = {
          from: moment(this.timeRange.split(',')[0]).format('MM月DD日'),
          to: moment(this.timeRange.split(',')[1]).format('MM月DD日'),
          fromWeek:moment(this.timeRange.split(',')[0]).weekday(),
          toWeek:moment(this.timeRange.split(',')[1]).weekday(),
          total:moment(this.timeRange.split(',')[1]).day()-moment(this.timeRange.split(',')[0]).day()
        }
        this.GetPrices(0)
      }
    },
    /**接受子组件传来的时间 */
    saveTimeRange(val){
      this.timeRange = val
      this.timeFomate()
      this.timePopupshow = false
    }
  }
}
</script>

<style scoped lang='scss'>

.dHeader{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  width: 100%;
  .backBtn{
    float: left;
    display: block;
    margin: 10px 0 0 8px;
  }
  .heartBtn{
    float: right;
    display: block;
    margin: 10px 16px 0 0;
  }
}
.dSwiper{
  height: 227px;
  img{
    height: 100%;
    width: 100%;
  }
}
.dBody{
  padding: 10px 20px;
  color: #333;
  .title1{
    color: #542813;
    font-size: 13px;
    line-height: 23.38px;
    font-weight: 700;
  }
  .title2{
    font-size: 24px;
    line-height: 36px;
    font-family: 'PingFangSC-Regular';
    font-weight: 700;
    color: #333;
  }
  .info{
    margin: 10px 0;
    .van-col{
      margin-bottom:5px;
    }
    font-size: 13px;
    .icon{
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .infoBox{
    font-size: 13px;
    padding-bottom: 10px;
    p{
      line-height: 22px;
    }
    .p1{
      font-weight: 700;
    }
    .icon{
      font-size: 30px;
      margin: 6px 14px 0 4px;
    }
    .van-col{
      border: 1px solid #d5d5d5;
      padding: 8px 8px;
      border-radius: 4px;
    }
  }
  .contentTitle{
    margin-top: 16px;
    font-size: 15px;
    color: #000;
    font-weight: 700;
  }
  .timeRange{
    margin-top: 20px;
    padding-bottom: 10px;
    .timeRangeT{
      color: #8D8D8D;
      font-size: 13px;
    }
    .timeRangeTitle2{
      text-align: right;
    }
    .timeRangeAll{
      color: #8D8D8D;
      font-size: 13px;
      line-height: 40px;
    }
    .timeRangeTime{
      color: #333;
      font-size: 17px;
      margin-top: 4px;
      font-weight: 700;
    }
    .timeRangeTime span{
      font-size: 13px;
    }
    .timeRangeTime2{
      text-align: right;
    }
  }
  .detail{
    .detailContent{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #000;
      line-height: 24px;
      margin-top: 10px;
    }
    .detailHandleClick{
      color: #DA4F53;
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
    }
  }
  .amap-wrapper {
    margin: 20px 0;
    width: 100%;
    height: 120px;
  }
  .defaultC{
    margin-left: 16px;
  }
  .defaultIcon{
    margin: 0 10px;
  }
  .defaultSpan{
    display: block;
    text-align: cell;
    font-size: 12px;
  }
  .notice2{
    padding-bottom: 80px;
  }
}

</style>
