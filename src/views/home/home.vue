<template>
  <div class="home">
    <van-row type="flex" justify="space-around" class="fixedSelect">
      <van-col span="8" @click="timePickerShow = true">{{ timeRange | timeRangeFilter }}<van-icon name="play"/></van-col>
      <van-col span="8" @click="positionPickerShow = true">{{ CategoryName }}<van-icon name="play"/></van-col>
      <van-col span="8" @click="selectorPickerShow = true">筛选<van-icon name="play"/></van-col>
    </van-row>
    <div class="banner"></div>
    <van-list
      class="homeList"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了">
      <van-row>
        <van-col span="12"
        v-for="(item,index) in roomList"
        @click="handleListClick(item,index)"
        class="homeCard"
        :key='index'>
          <img v-lazy="GLOBAL.imgSrc+item.images[0].imageUrl" class="homeListImg">
          <div class="homeListInfo">
            <p class="homeTitle">{{ item.title }}</p>
            <div class="homePrice overflow">
              <p class="float-left">￥{{ item.startPrice }} /晚</p>
              <!-- <div class="float-right">
                <img v-if="item.isMyFavor" src="@/assets/img/favourYes.png" class="favourIcon">
                <img v-else src="@/assets/img/favourNo.png" class="favourIcon">
                <p class="favourCount">0赞</p>
              </div> -->
            </div>
          </div>
        </van-col>
      </van-row>
    </van-list>

    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多房源了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无房源...</div>
    </infinite-loading>

    <!-- 日期弹出框 -->
    <van-popup
    v-model="timePickerShow"
    position="top"
    closeable
    close-icon-position="top-left">
      <time-picker @timeChange='timeChange'/>
    </van-popup>
    <!-- 位置弹出框 -->
    <van-popup
    v-model="positionPickerShow"
    position="top">
      <postion-picker @positionChange='positionChange'/>
    </van-popup>
    <!-- 筛选弹出框 -->
    <van-popup
    v-model="selectorPickerShow"
    position="top"
    closeable
    close-icon-position="top-left">
      <selector-picker @selectorChange='selectorChange'/>
    </van-popup>
  </div>
</template>

<script>
import { GetRoomList } from '@/api/roomsQuery'

import share from '@/utils/share';
import tokenAuth from '@/utils/tokenAuth';
import Vue from 'vue'
import moment from 'moment';
import timePicker from './component/calendar'
import postionPicker from './component/position'
import selectorPicker from './component/selector'
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  name: 'home',
  props: {
  },
  components:{ timePicker, postionPicker, selectorPicker},
  data() {
    return {
      error: false,
      roomList:[],
      timePickerShow:false,
      positionPickerShow:false,
      selectorPickerShow:false,
      roomListForm:{
        CategoryId:null,
        from:moment().format('YYYY-MM-DD'),
        to:moment().add(1,'d').format('YYYY-MM-DD'),
        PriceFrom:null,
        PriceTo:null,
        LodgerCount:null,
        BedCount:null,
        BedroomCount:null,
        SkipCount:0,
        MaxResultCount:20,
      },
      CategoryName: '位置',
      timeRange:moment().format('YYYY-MM-DD')+','+moment().add(1,'d').format('YYYY-MM-DD'),

    }
  },
  filters:{
    timeRangeFilter(val){
      if(val == '' || val == null){ 
        return moment().format('M.D') + '-' + moment().add(1,'d').format('M.D')
      }else{
        var timeRange = []
        val.split(',').forEach(element => {
          timeRange.push(moment(element).format('M.D'))
        })
        return timeRange.join('-')
      }
    }
  },
  created(){
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query);
  },
  methods:{
    onConfirm() {
      this.$refs.item.toggle();
    },
    /**
     * 点击详情
     */
    handleListClick(item){
      this.$router.push({
        path: 'detail',
        query:{
          id: item.id,
          timeRange: this.timeRange
        }
      })
    },  
    timeChange(data){
      this.reset()
      this.roomListForm.from = data.from
      this.roomListForm.to = data.to
      this.timeRange = moment(data.from).format('YYYY-MM-DD') + ',' + moment(data.to).format('YYYY-MM-DD')
      this.timePickerShow = false
    },
    positionChange(data){
      this.reset()
      this.roomListForm.CategoryId = data.id
      this.CategoryName = data.text ? data.text : '位置'
      this.positionPickerShow = false
    },
    selectorChange(data){
      this.reset()
      this.roomListForm.PriceFrom = data.PriceFrom
      this.roomListForm.PriceTo = data.PriceTo
      this.roomListForm.LodgerCount = data.LodgerCount
      this.roomListForm.BedCount = data.BedCount
      this.roomListForm.BedroomCount = data.BedroomCount
      this.selectorPickerShow = false
    },
    reset(){
      this.roomListForm.SkipCount = 0;
      this.roomListForm.MaxResultCount = 20;
      this.roomList = []
      this.infiniteHandler()    
    },
    /**无线滚动 */
    infiniteHandler($state) {
      GetRoomList(this.roomListForm).then((result) => {
        this.roomList.push(...result.result.items)
        if (result.result.items.length) {
          this.roomListForm.SkipCount += 20;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
      })
    },
  },
 
}
</script>

<style scoped lang='scss'>
.home{
  background: #f4f4f4;
  min-height: 100vh;
}
.fixedSelect{
  background: rgba(0,0,0,0.8);
  z-index: 100;
  height: 50px;
  line-height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  .van-icon{
    font-size: 10px;
    transform:rotate(90deg);
    margin-left: 4px;
  }
}
.banner{
  background: url('../../assets/img/mingsubg.jpg') no-repeat center;
  width: 100%;
  height: 33vh;
  background-size: 100% 100%;
  color: #fff;
  line-height: 30px;
  letter-spacing: 3px;
}
.dropdownMenu{
  background: rgba($color: #000000, $alpha: 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.homeList{
  background: #f4f4f4;
  padding: 0 0 0 3%;
}
.homeCard{
  overflow: hidden;
  background: #fff;
  position: relative;
  width: 47%;
  margin: 3% 3% 0 0;
  border-radius: 2%;
  .homeListImg{
    width: 100%;
    height: 34.2vw;
    img{
      width:100%;
      height: 100%;
    }
  }
  .favourIcon{
    width: 16px;
    height: 16px;
    display: block;
    margin: 5px auto 0;
  }
  .favourCount{
    padding: 0;
    font-size: 9px;
    font-weight: 500;
    text-align: center;
    line-height: 20px;
  }
  .homeListInfo{
    padding: 0px 6px;
    font-weight: 700;
    .homeTitle{
      font-size: 12px;
      border-bottom: 1px solid #eee;
      line-height: 24px;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow:hidden;
      padding-bottom: 5px;
    }
    .homePrice{
      font-size: 15px;
      line-height: 36px;
      color: #542713;
    }
    .linePrice{
      text-decoration:line-through;
      color:#999;
      font-size:14px;
      margin-left:10px;
    }
  }
}
</style>

<style lang="scss">
  .van-dropdown-menu__title{
    color: #fff!important;
  }
  [class*=van-hairline]::after{
    border: none!important;
  }
</style>