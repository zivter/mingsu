<template>
  <div class="detail">
    <div class="dHeader">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="32px"
        class='backBtn'
        @click="$router.go(-1)"/>
      <!-- <van-icon
        :name="likeHeart==false?'like-o':'like'"
        :color="likeHeart==false?'#fff':'red'"
        size="32px"
        class="heartBtn"
        @click="likeHeartClick"/> -->
    </div>
    <van-swipe indicator-color="white" class="dSwiper" @change="onChange">
      <van-swipe-item>
        <img v-lazy="GLOBAL.imgSrc+detailData.cover" alt="">
      </van-swipe-item>
      <van-swipe-item v-for="item in detailData.images" :key="item.id">
        <img v-lazy="GLOBAL.imgSrc+item.imageUrl" alt="">
      </van-swipe-item>
      <template #indicator>
      <div class="custom-indicator" style="color:#fff;font-size:10px">
        <van-icon name="photo-o" size="12" style="top:2px;right:2px"/>{{ current + 1 }}/{{detailData.images.length}}
      </div>
    </template>
    </van-swipe>
    <div class="dBody">
      <!-- 标题简介 -->
      <p class="title1">{{ detailData.title }}</p>
      <!-- <p class="title2">近地铁 | 拎包入住 | 近地铁 | 朝南</p> -->
      <div class="infoBox">
        <span class="infoBoxPrice">{{ roomSelectPrice }}<span style="font-size:14px;">/晚</span></span>
        <!-- <span>一室一厅</span>
        <span>37m²</span> -->
      </div>
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
      <!-- 房源信息 -->
      <div class="roomInfo">
        <p class="contentTitle">房源信息</p>
        <van-row class="roomInfoRow">
          <van-col span="12">床数<span class="roomInfoSpan">{{ detailData.bedCount }}</span></van-col>
          <van-col span="12">人数<span class="roomInfoSpan">{{ detailData.lodgerCount }}</span></van-col>
          <van-col span="12">卧室数<span class="roomInfoSpan">{{ detailData.bedroomCount }}</span></van-col>
          <van-col span="12">卫生间数<span class="roomInfoSpan">{{ detailData.bathroomCount }}</span></van-col>
        </van-row>
      </div>
      <!-- 设施 -->
      <div class="facilities">
        <p class="contentTitle">服务设施</p>
        <van-grid
        :gutter="10"
        :border='false'
        style="margin-top:10px;">
          <van-grid-item
            v-for="(item,index) in facilitiesList"
            :key="item.name"
            v-show='index<7'
            :text="item.name">
            <template slot="icon">
              <svg-icon
              :icon-class="'#icon-' + item.font_class"
              font-size="22px"
              style="margin-bottom:10px;"/>
            </template>
          </van-grid-item>
          <van-grid-item
            @click="handleServiceClick()">
            <template slot="icon">
              <svg-icon
              icon-class='#icon-xinzeng'
              font-size="22px"
              style="margin-bottom:10px;"/>
            </template>
            <template slot="text">
              <span style="color:red;font-size:12px;">更多</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 详情 -->
      <div class="detail">
        <p class="contentTitle">详情介绍</p>
        <p class="detailContent">{{ detailData.description }}</p>
        <p href="" class="detailHandleClick" @click="handleIntroClick">查看详情>></p>
      </div>
      <!-- 位置 -->
      <div class="map">
        <p class="contentTitle">房屋位置</p>
        <div class="amap-wrapper">
          <el-amap
          class="amap-box"
          vid="amap-vue"
          :position="center"
          :zoom="zoom">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker.position">
            </el-amap-marker>
          </el-amap>
        </div>
      </div>

      <!-- 预定须知 -->
      <!-- <div class="notice">
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
        :cell-value='detailData.refundRule '
        cell-color='#DA4F53'/>
      </div> -->
      
      <!-- 入住须知 -->
      <!-- <div class="notice2">
        <p class="contentTitle" style="margin-bottom:16px;">入住须知</p>
        <cell-components
        cell-name='入离时间'
        :cell-value='rulishijian'
        cell-color='#000'/>
        <cell-components
        cell-name='接待时间'
        :cell-value='wordTime'
        cell-color='#000'/>
        <cell-components
        cell-name='卫生打扫'
        cell-value='1客1扫'
        cell-color='#000'/>
      </div> -->
      <!-- 提交订单兰 -->
      <van-submit-bar
        :price='roomSelectPrice*100'
        label=" "
        style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
        :suffix-label='"/晚 (原价¥"+detailData.linePrice+"/晚)"'
        button-text="立即预定"
        @submit="skipToOrder">
      </van-submit-bar>
    </div>
    <!-- 设施服务 -->
    <van-popup
    v-model="servicePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <service :facilities-list='facilitiesList'/>
    </van-popup>

    <!-- 房源介绍 -->
    <van-popup
    v-model="introPopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <intro :intro-data='detailData.description'/>
    </van-popup>

    <!-- 时间 -->
    <van-popup
    v-model="timePopupshow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }">
      <time-picker @saveTimeRange='saveTimeRange' :room-id='this.$route.query.id'/>
    </van-popup>


  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon/index'
import timePicker from '@/components/timePicker/index'
import service from './service'
import intro from './intro'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import moment from 'moment'
import nameJson from '../../icons/iconfont.json'
import share from '@/utils/share';
import { GetDetail, GetIdleDatesByDateRang, GetCommonSettings,GetIdleDatesByDateRange } from '@/api/roomsQuery'
import { GetPrices } from '@/api/room'
import tokenAuth from '@/utils/tokenAuth';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
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
  components:{ svgIcon, service, intro, timePicker },
  data() {
    return {
      detailData:{
        images:[]
      },
      facilitiesList:[],
      likeHeart: false,
      zoom: 13,
      center: [],
      markers: [],
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
      roomSelectPrice:'',
      rulishijian:'',
      wordTime:'',
      current: 0,
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
    tokenAuth.getAuth(this.$route.query);
    this.GetDetail()
    this.timeRange = this.$route.query.timeRange
    this.timeFomate()
    this.GetPrices(1)
    this.GetCommonSettings()
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
          this.getIconCnName(result.result.supporting.split(','),this.facilitiesList)
          let o = {
            position:[this.detailData.locationMap.split(',')[1],this.detailData.locationMap.split(',')[0]],
            visible:true
          }
          this.markers.push(o)
          const title = `浙拾光-酒店公寓（${result.result.bedroomCount}卧${result.result.bedCount}床${result.result.bathroomCount}卫适合${result.result.lodgerCount}人入住）`;
          share.share(result.result.title.split('】')[0].concat('】'), this.GLOBAL.imgSrc+result.result.cover, title);
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
      this.servicePopupshow = true;
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
        From: this.timeRangeInfo.from,
        To: this.timeRangeInfo.to
      }
      GetPrices(param).then((result) => {
        if(result.success){
          if(type == 1){
            this.roomSelectPrice = this.get_object_first_attribute(result.result.prices)
          }else if(type == 0){
            // this.roomSelectPrice = result.result.prices[0]
            // result.result.prices.each()
            var pricedata = result.result.prices
            for (var i in pricedata){
              this.roomSelectPrice = pricedata[i]
              break
            }
          }
        }
      }).catch((err) => {
        
      });
    },
    get_object_first_attribute(data){
      for (var item in data)
        return data[item]
    },
    timeFomate(){
      if(this.timeRange){
        this.timeRangeInfo = {
          from: moment(this.timeRange.split(',')[0]).format('MM-DD'),
          to: moment(this.timeRange.split(',')[1]).format('MM-DD'),
          fromWeek:moment(this.timeRange.split(',')[0]).weekday(),
          toWeek:moment(this.timeRange.split(',')[1]).weekday(),
          total:moment(this.timeRange.split(',')[1]).diff(moment(this.timeRange.split(',')[0]),'day')
        }
        this.GetPrices(0)
      }
    },
    /**接受子组件传来的时间 */
    saveTimeRange(val){
      this.timeRange = val
      this.timeFomate()
      this.timePopupshow = false
    },
    //获取中文名
    getIconCnName(data,name){
      data.forEach(element => {
        element=element.replace(/^\s+|\s+$/g,'');
        for(var item of nameJson.glyphs){
          if(element == item.font_class){
            name.push(item)
            break
          }
        }
      });
    },
    GetCommonSettings(){
      GetCommonSettings().then((result) => {
        this.rulishijian = result.result.checkInTime+'后入住,'+result.result.checkOutTime+'前退房'
        this.wordTime = result.result.workTimeFrom+' - '+result.result.workTimeTo
      }).catch((err) => {
        
      });
    },
    onChange(index) {
      this.current = index;
    },
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
  height: 56.4vw;
  img{
    height: 100%;
    width: 100%;
  }
}
.dBody{
  padding: 10px 20px;
  color: #333;
  .title1{
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
  .title2{
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
  }
  .infoBox{
    font-weight: 700;
    margin-top: 12px;
    span{
      margin-right: 10px;
    }
    .infoBoxPrice{
      color: #DA4F53;
      font-size: 22px;
    }
  }
  .roomInfo{
    font-weight: 700;
    font-size: 14px;
    .roomInfoRow{
      color: #999;
    }
    .van-col{
      margin-bottom: 10px;
    }
    .roomInfoSpan{
      margin-left: 10px;
      color: #333;
    }
  }
  .contentTitle{
    margin: 16px 0 16px 0;
    font-size: 18px;
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
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #000;
      line-height: 24px;
      margin-top: 10px;
      word-break:break-all;
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
    height: 220px;
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
.van-submit-bar__text{
  text-align: left;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
