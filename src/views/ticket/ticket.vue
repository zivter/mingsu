<template>
  <div class="ticket">
    <van-search
      placeholder="关键词搜索"
      v-model="ticketSearch"
      class="searchContent"
      @input='onLoad'>
      <van-icon slot="left-icon" name="search" color="#DA4F53"/>
    </van-search>
    <van-list
      v-model="ticketListLoading"
      :finished="ticketListFinished"
      class="ticketList"
      :error.sync="ticketListError"
      error-text="请求失败，点击重新加载"
      finished-text="滑动加载更多"
      @load="onLoad">
      <div
        v-for="(item,index) in ticketList"
        :key='index'
        class="ticketCard"
        @click="handleListClick(item,index)">
        <img :src="GLOBAL.imgSrc+item.coverImage" alt="" class="ticketListImg">
        <p class="ticketLable">{{ item.regionFullName | regionFullNameFilter }}</p>
        <div class="ticketListInfo overflow">
          <p class="ticketTitle float-left">{{ item.title }}</p>
          <p class="ticketPrice float-right"><span class="ticketPriceNum"><span style="font-size:13px;">￥</span>{{ item.minPrice }} 32</span> / 起</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { WechatH5Auth, ExternalAuthenticate } from '@/api/tokenAuth'
import { TouristAttractionQueryGetAll } from '@/api/ticket'
import Vue from 'vue'

export default {
  name: 'ticket',
  props: {
  },
  data() {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      list: [],
      ticketListLoading: false,
      ticketListError: false,
      ticketListFinished: false,
      ticketList:[],
      total:0,
      ticketSearch:''
    }
  },
  created(){
    // const that = this;
    // that.$store.dispatch('tokenAuth/getAuth', {
    //   exist: function (token) {
    //     console.log(token)
    //   },
    //   none: function () {
    //     console.log(that.$router)
    //     if (that.$route.query.encryptedCode) {
    //       that.ExternalAuthenticate(that.$route.query.encryptedCode)
    //     }
    //     else {
    //       that.getWechatH5Auth()
    //     }
    //   }
    // })
  },
  filters:{
    regionFullNameFilter(val){
      return val.replace(/,/g,' \u2981 ')
    }
  },
  methods:{
    onLoad(val) {
      console.log(111)
      const param = {
        Keyword:val,
        SkipCount:0,
        MaxResultCount:1
      }
      TouristAttractionQueryGetAll(param).then((result) => {
        if(result){
          this.ticketList = result.result.items
          this.total = result.result.totalCount
        }
      }).catch((err) => {
        this.ticketListError = true
      }).finally(()=>{
        this.ticketListFinished = true;
        this.ticketListLoading = false;
      });
    },
    /**
     * 点击详情
     */
    handleListClick(item,index){
      this.$router.push({
        path:'ticketDetail',
        query:{
          id:item.id
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
        console.log(result.result)
        result.result.recordTime = new Date().getTime();//记录时间
        this.$store.dispatch('tokenAuth/setToken', result.result)
        this.$router.go(0)
      }).catch((err) => {
        
      });
    },
  }
}
</script>

<style scoped lang='scss'>
.ticket{
  min-height: 100vh;
  background: #F8F9FB;
}
.searchContent .van-search__content{
  border-radius:20px;
}
.ticketList{
  background: #F8F9FB;
}
.ticketCard{
  margin: 20px 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 1px 1px 8px #ddd;
  .ticketListImg{
    width: 100%;
    height: 120px;
  }
  .ticketLable{
    color: #542813;
    font-size: 14px;
    padding: 0px 20px;
    line-height: 24px;
    margin-top:5px;
  }
  .ticketListInfo{
    padding: 0px 20px;
    margin-bottom: 10px;
    .ticketTitle{
      font-size: 16px;
      line-height: 36px;
      font-weight: 700;
    }
    .ticketPrice{
      font-size: 14px;
      line-height: 36px;
    }
    .ticketPriceNum{
      color:#DA4F53;
      font-weight:700;
      font-size:18px;
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