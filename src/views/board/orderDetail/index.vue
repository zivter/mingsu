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
      <p class="title2">近地铁 | 拎包入住 | 近地铁 | 朝南</p>
      <div class="infoBox">
        <span class="infoBoxPrice">{{ roomSelectPrice }}<span style="font-size:14px;">/月</span></span>
        <span class="infoPrePrice">&yen;1299</span>
        <span class="infoText">可月租</span>
      </div>
      <ul class="listBox">
        <li>
          <van-icon name="arrow" color="#373737" size="16px" class='rightBtn' />
          <p>租约时长</p>
        </li>
        <li>
          <van-icon name="arrow" color="#373737" size="16px" class='rightBtn' />
          <p>付款周期</p>
        </li>
        <li>
          <van-icon name="arrow" color="#373737" size="16px" class='rightBtn' />
          <p>入住人信息</p>
        </li>
      </ul>
      <ul class="listBox">
        <li>
          <span class="listRightText">&yen;1213.00</span>
          <p>周期租金</p>
        </li>
        <li>
          <span class="listRightText">2020.8.1-2020.10.1(共60天)</span>
          <p>租约时长</p>
        </li>
        <li>
          <span class="listRightText">每日一付</span>
          <p>付款周期</p>
        </li>
        <li>
          <span class="listRightText">&yen;1213.00</span>
          <p>押金</p>
        </li>
        <li>
          <span class="listRightText">&yen;1213.00</span>
          <p>总租金</p>
        </li>
        <li>
          <span class="listRightText">&yen;1213.00</span>
          <p>合计</p>
        </li>
      </ul>
      
      <!-- 提交订单兰 -->
      <van-submit-bar
        :price='roomSelectPrice*100'
        label=" "
        style="z-index:1000;box-shadow:0px 16px 10px 16px #ddd;"
        :suffix-label='"(5个月)"'
        button-text="提交订单"
        @submit="skipToOrder">
      </van-submit-bar>
    </div>

    <!-- 确认订单 -->
    <van-popup
    v-model="confirmPopupshow"
    closeable
    close-icon-position="top-left"
    class="confirmBox"
    position="bottom"
    :style="{ height: '100%' }">
      <div class="intro">
        <p class="introTitle">房源介绍</p>
        <p style="word-break:break-all;white-space: pre-line;">{{ introData }}</p>
        <!-- <p class="contentTitle">概要</p>
        <p>【有间雅阁】是一间高层全湖景公寓,坐落在珍珠半岛,交通便利｡小区对面就是千岛湖珍珠半岛广场,广场中央有无边水池､悬空观景台等｡广场边上有玩水之处 </p>
        <p>【千岛湖欢乐水世界】皮划艇､摩托艇､冲浪艇等应有尽有,让您在千岛湖来一场不寻常的旅行｡ 广场周边有千岛湖水之灵演艺中心､千岛湖博物馆､千岛湖图书馆和千岛湖青少年活动中心｡ </p> 
        <p>房间配套设施齐全,提供基本厨房用具,并为客人准备各类茶叶,希望每一位房客就如回家一样｡ </p> 
        <p class="contentTitle">房源细节</p>
        <p>【有间雅阁】高层全湖景公寓,1室1厨1卫结构｡干净整洁,依山傍水,有一个大阳台视野绝佳,拉开窗帘整片湖面尽收眼底｡晨起可看朝阳初升､傍晚可看日落西山｡闲暇时沏一壶茶,坐在阳台上,听听音乐静静地观看湖景｡</p> -->
      </div>
    </van-popup>

  </div>
</template>

<script>
import cellComponents from '@/components/cellComponents/index'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import moment from 'moment'
import nameJson from '../../../icons/iconfont.json'
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
  name: 'orderDetail',
  props: {
  },
  data() {
    return {
      detailData:{
        images:[
          {
            imageUrl:'./img/aboutus3.png'
          }
        ]
      },
      facilitiesList:[],
      likeHeart: false,
      zoom: 13,
      center: [],
      markers: [],
      address: '',
      btnError: false,
      servicePopupshow: false,
      confirmPopupshow: false,
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
    // this.GetDetail()
    // this.timeRange = this.$route.query.timeRange
    // this.timeFomate()
    // this.GetPrices(1)
    // this.GetCommonSettings()
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
    handleConfirmClick(){
      this.confirmPopupshow = true
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
  height: 227px;
  img{
    height: 100%;
    width: 100%;
  }
}
.dBody{
  padding: 10px 0;
  background:#F5F5F5;
  color: #333;
  .title1{
    padding-left:15px;
    padding-right:15px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    background:#fff;
  }
  .title2{
    padding-left:15px;
    padding-right:15px;
    font-size: 14px;
    font-weight: 700;
    padding-top: 10px;
    background:#fff;
  }
  .infoBox{
    padding-left:15px;
    padding-right:15px;
    font-weight: 700;
    padding-top: 12px;
    background:#fff;
    span{
      margin-right: 10px;
    }
    .infoBoxPrice{
      color: #DA4F53;
      font-size: 22px;
    }
    .infoPrePrice,.infoText{
      font-size:12px;
      color:#C4C4C4
    }
  }
  .listBox{
    margin-top:20px;
    padding:0 15px;
    background:#fff;
    li{
      line-height:54px;
      height:54px;
      border-bottom:1px solid #c4c4c4;
      .rightBtn{
        float: right;
        display: inline-block;
        width: 6px;
        height: 12px;
        margin-top: 20px;
        margin-right:6px;
      }
      .listRightText{
        float:right;
      }
    }
  }
  .roomInfo{
    font-weight: 700;
    font-size: 14px;
    .roomInfoRow{
      color: #aaa;
    }
    .van-col{
      margin-bottom: 10px;
    }
    .roomInfoSpan{
      margin-left: 10px;
      color: #000;
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
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.confirmBox{
  .intro{
    padding: 0 24px;
    margin-top: 50px;
  }
  .introTitle{
    font-size: 20px;
    font-weight: 700;
  }
  .contentTitle{
    margin-top: 16px;
    font-size: 15px;
    color: #000;
    font-weight: 700;
  }
  p{
    margin-top: 20px;
  }
}
</style>
