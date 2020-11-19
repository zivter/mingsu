<template>
  <div class="home">
    <van-row type="flex" justify="space-around" class="fixedSelect">
      <van-col span="8" @click="priceShow = true">{{ selectType }}<van-icon name="play"/></van-col>
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
        <div span="24"
        v-for="(item,index) in roomList"
        @click="handleListClick(item,index)"
        class="homeCard"
        :key='index'>
          <van-swipe indicator-color="white" class="dSwiper homeListImg">
            <van-swipe-item>
              <img v-lazy="GLOBAL.imgSrc2+item.cover" alt="">
            </van-swipe-item>
            <van-swipe-item v-for="item in item.images" :key="item.id">
              <img v-lazy="GLOBAL.imgSrc2+item.imageName" alt="">
            </van-swipe-item>
          </van-swipe>
          <div class="homeListInfo">
            <p class="homeTitle">{{ item.title }}</p>
            <div class="homePrice overflow">
              <p class="float-left">￥{{ item.thirtyAmount }} /月</p>
              <p class="float-left listTag">酒店公寓</p>
              <div class="float-right" @click.stop="favourClick(item)">
                <img v-if="item.isMyFavor" src="@/assets/img/favourYes.png" class="favourIcon">
                <img v-else src="@/assets/img/favourNo.png" class="favourIcon">
                <p class="favourCount">{{ item.praiseCount }}赞</p>
              </div>
            </div>
          </div>
        </div>
      </van-row>
    </van-list>

    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多房源了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无房源...</div>
    </infinite-loading>

    <!-- 条件筛选 -->
    <van-action-sheet v-model="priceShow" :actions="priceActions" @select="priceOnSelect" />
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
import { roomList, addPraise } from '@/api/room'

import share from '@/utils/share';
import tokenAuth from '@/utils/tokenAuth';
import Vue from 'vue'
import moment from 'moment';
import postionPicker from './component/position'
import selectorPicker from './component/selector'
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  name: 'home',
  props: {
  },
  components:{ postionPicker, selectorPicker},
  data() {
    return {
      error: false,
      roomList:[],
      priceShow:false,
      positionPickerShow:false,
      selectorPickerShow:false,
      roomListForm:{
        CategoryId:null,
        PriceFrom:null,
        PriceTo:null,
        LodgerCount:null,
        BedCount:null,
        BedroomCount:null,
        page: 1,
        limit: 20,
      },
      priceActions: [
        { name: '按价格最低排序', value:'价格最低' },
        { name: '按价格最高排序', value:'价格最高' },
        { name: '按最近更新排序', value:'最近更新' },
        { name: '按最晚更新排序', value:'最晚更新' },
        { name: '取消', value:'0' }
      ],
      CategoryName: '位置',
      selectType: '价格最低',
    }
  },
  filters:{
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
        path: 'rentDetail',
        query:{
          id: item.id,
        }
      })
    },
    timeChange(data){
      this.roomListForm.page = 1;
      this.roomListForm.limit = 20;
      this.priceShow = false
      this.roomList = []
      this.infiniteHandler()
    },
    positionChange(data){
      this.roomListForm.page = 1;
      this.roomListForm.limit = 20;
      this.roomListForm.CategoryId = data.id
      this.CategoryName = data.text ? data.text : '位置'
      this.positionPickerShow = false
      this.roomList = []
      this.infiniteHandler()
    },
    selectorChange(data){
      this.roomListForm.page = 1;
      this.roomListForm.limit = 20;
      this.roomListForm.LodgerCount = data.LodgerCount
      this.roomListForm.BedCount = data.BedCount
      this.roomListForm.BedroomCount = data.BedroomCount
      this.selectorPickerShow = false
      this.roomList = []
      this.infiniteHandler()    
    },
    priceOnSelect(item) {
      if(item.value != 0) {
        this.selectType = item.value
      }
      this.priceShow = false
    },
    /**无线滚动 */
    infiniteHandler($state) {
      roomList(this.roomListForm).then((result) => {
        this.roomList.push(...result.data.records)
        if (result.data.records.length > 0) {
          this.roomListForm.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      })
    },
    favourClick(item) {
      const param = {
        rid: item.id
      }
      addPraise(param).then((result) => {
        item.isMyFavor = true
        item.praiseCount = item.praiseCount + 1
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    }
  },
 
}
</script>

<style scoped lang='scss'>
.home{
  background: #f4f4f4;
  min-height: calc(100vh - 60px);
  padding-bottom: 40px;
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
  background: url('../../assets/img/banner.png') no-repeat center;
  width: 100%;
  height: 45vh;
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
}
.homeCard{
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  margin: 3% 3% 0;

  .homeListImg{
    width: 100%;
    height: 53vw;
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
    font-size: 10px;
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
    .listTag{
      font-size: 11px;
      background: #542713;
      color: #fff;
      line-height: 18px;
      padding: 0 5px;
      border-radius: 3px;
      margin: 9px 0 0 10px;
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