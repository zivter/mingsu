<template>
  <div class="ticket">
    <van-search
      placeholder="关键词搜索"
      v-model="searchForm.Keyword"
      class="searchContent"
      @input='onLoad'>
      <van-icon slot="left-icon" name="search" color="#DA4F53"/>
    </van-search>
    <van-list
      class="ticketList">
      <div
        v-for="(item,index) in ticketList"
        :key='index'
        class="ticketCard"
        @click="handleListClick(item,index)">
        <img :src="GLOBAL.imgSrc+item.coverImage" alt="" class="ticketListImg">
        <p class="ticketLable">{{ item.regionFullName | regionFullNameFilter }}</p>
        <div class="ticketListInfo overflow">
          <p class="ticketTitle float-left">{{ item.title }}</p>
          <p class="ticketPrice float-right"><span class="ticketPriceNum"><span style="font-size:13px;">￥</span>{{ item.minPrice }}</span> / 起</p>
        </div>
      </div>
    </van-list>

    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多门票了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无门票...</div>
    </infinite-loading>

  </div>
</template>

<script>
import { TouristAttractionQueryGetAll } from '@/api/ticket'
import tokenAuth from '@/utils/tokenAuth';
import Vue from 'vue'
import share from '@/utils/share';

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
      ticketSearch:'',
      searchForm:{
        SkipCount:0,
        MaxResultCount:20,
        Keyword:''
      }
    }
  },
  created(){
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query, 'ticket');
  },
  filters:{
    regionFullNameFilter(val){
      return val.replace(/,/g,' \u2981 ')
    }
  },
  methods:{
    onLoad(){
      this.searchForm.SkipCount = 0
      this.searchForm.MaxResultCount = 20
      this.ticketList = []
      this.infiniteHandler()
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
    /**无线滚动 */
    infiniteHandler($state) {
      TouristAttractionQueryGetAll(this.searchForm).then((result) => {
        this.ticketList.push(...result.result.items)
        if (result.result.items.length) {
          this.searchForm.SkipCount += 20;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
      })
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