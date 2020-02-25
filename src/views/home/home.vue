<template>
  <div class="home">
    <!-- <van-dropdown-menu
    :overlay='false'
    class='dropdownMenu'>
      <van-dropdown-item title="日期" ref="item" @open='timePickerShow = true'/>
      <van-dropdown-item title="位置" ref="item" @open='positionPickerShow = true'/>
      <van-dropdown-item title="筛选" ref="item" @open='selectorPickerShow = true'/>
    </van-dropdown-menu> -->

    <van-row type="flex" justify="space-around" class="fixedSelect">
      <van-col span="8" @click="timePickerShow = true">{{ timeRange | timeRangeFilter }}<van-icon name="play"/></van-col>
      <van-col span="8" @click="positionPickerShow = true">位置<van-icon name="play"/></van-col>
      <van-col span="8" @click="selectorPickerShow = true">筛选<van-icon name="play"/></van-col>
    </van-row>

    <div class="banner">
      <P class="bannerP1">自营名宿</P>
      <p class="bannerP2">自营优质资源，星级保洁，管家专属服务。</p>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      class="homeList"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad">
      <div
      v-for="(item,index) in roomList"
      :key='index'
      class="homeCard"
      @click="handleListClick(item,index)">
        <van-swipe indicator-color="white" class="homeListImg">
          <van-swipe-item v-for="(imgItem,index) in item.images" :key="index">
            <img :src="GLOBAL.imgSrc+imgItem.imageUrl" alt="">
          </van-swipe-item>

        </van-swipe>
        <div class="homeListInfo">
          <p class="homeLable">{{ item.roomStyleName }}</p>
          <p class="homeTitle">{{ item.title }}</p>
          <p class="homePrice">￥{{ item.price }} /晚</p>
        </div>
      </div>
    </van-list>

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
import { WechatH5Auth, ExternalAuthenticate } from '@/api/tokenAuth'
import { GetRoomList } from '@/api/roomsQuery'

import Vue from 'vue'
import moment from 'moment';

import timePicker from './component/calendar'
import postionPicker from './component/position'
import selectorPicker from './component/selector'

export default {
  name: 'home',
  props: {
  },
  components:{ timePicker, postionPicker, selectorPicker},
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
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
    const that = this;
    that.$store.dispatch('tokenAuth/getAuth', {
      exist: function (token) {},
      none: function () {
        console.log(that.$router)
        if (that.$route.query.encryptedCode) {
          that.ExternalAuthenticate(that.$route.query.encryptedCode)
        }
        else {
          that.getWechatH5Auth()
        }
      }
    })
  },
  methods:{
    onConfirm() {
      this.$refs.item.toggle();
    },
    onLoad() {
      const that = this;
      that.$store.dispatch('tokenAuth/getAuth', {
        exist: function (token) {
          GetRoomList(that.roomListForm).then((result) => {
            that.roomList.push(...result.result.items)
          }).catch((err) => {
            this.$notify({type:'warning',message:err})
          }).finally(() => {
            // 加载状态结束
            that.loading = false;
            that.finished = true;
          });
        },
        none: function () {}
      })
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

    //获取encryptedCode
    getWechatH5Auth(){
      WechatH5Auth(Vue.prototype.url)
    },
    
    //微信认证cb
    ExternalAuthenticate (encryptedCode){
      const param = {
        "authProvider": "WechatH5",
        "providerKey": new Date().getTime(),
        "providerAccessCode": encryptedCode
      }
      ExternalAuthenticate(param).then((result) => {
        result.result.recordTime = new Date().getTime();//记录时间
        this.$store.dispatch('tokenAuth/setToken', result.result)
        this.$router.go(0)
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },

    timeChange(data){
      this.roomListForm.from = data.from
      this.roomListForm.to = data.to
      this.timeRange = moment(data.from).format('YYYY-MM-DD') + ',' + moment(data.to).format('YYYY-MM-DD')
      this.timePickerShow = false
      this.roomList = []
      this.onLoad()
    },
    positionChange(data){
      this.roomListForm.CategoryId = data
      this.positionPickerShow = false
      this.roomList = []
      this.onLoad()
    },
    selectorChange(data){
      this.roomListForm.PriceFrom = data.PriceFrom
      this.roomListForm.PriceTo = data.PriceTo
      this.roomListForm.LodgerCount = data.LodgerCount
      this.roomListForm.BedCount = data.BedCount
      this.roomListForm.BedroomCount = data.BedroomCount
      this.selectorPickerShow = false
      this.roomList = []
      this.onLoad()    }
  }
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
  background: url('../../assets/img/banner.jpg') no-repeat center;
  width: 100%;
  height: 260px;
  background-size: 100% 100%;
  color: #fff;
  line-height: 30px;
  padding-left: 20px;
  .bannerP1{
    font-size: 30px;
    padding-top: 170px;
    margin-bottom: 6px;
  }
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
  margin: 20px 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  position: relative;
  .booked{
    background: url("../../assets/img/booked.png") no-repeat center;
    background-position: 50% 30%;
    background-color: rgba($color: #fff, $alpha: 0.5);
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .homeListImg{
    width: 100%;
    height: 230px;
    img{
      width:100%;
      height: 100%;
    }
  }
  .homeListInfo{
    padding: 10px 20px;
    font-weight: 700;
    .homeLable{
      color: #542813;
      font-size: 14px;
    }
    .homeTitle{
      font-size: 16px;
      border-bottom: 1px solid #eee;
      line-height: 36px;
    }
    .homePrice{
      font-size: 16px;
      line-height: 36px;
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