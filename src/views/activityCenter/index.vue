<template>
  <div class="activityCenter">
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
          <img v-lazy="GLOBAL.imgSrc+item.images[0].imageUrl" alt=""  class="homeListImg">
          <div class="homeListInfo">
            <p class="homeTitle">{{ item.title }}</p>
            <div class="homePrice overflow">
              <p class="float-left">￥{{ item.startPrice }} /晚</p>
              <div class="float-right">
                <img src="@/assets/img/favourYes.png" alt="" class="favourIcon">
                <p class="favourCount">520赞</p>
              </div>
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
  </div>
</template>

<script>
import { welfareList } from "@/api/center";
import Vue from 'vue'

export default {
  name: 'ActivityCenter',
  props: {
  },
  data() {
    return {
      welfareLists: []
    }
  },
  created(){
      this.getwelfareList()
  },
  filters:{
  },
  methods:{
    getwelfareList() {
			const param = {
				page: 1,
				limit: 20
			}
      welfareList(param).then((result) => {
        this.welfareLists = result.result
      }).catch((err) => {
        this.$notify({ type: "danger", message: err });
      })
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
  }
}
</script>

<style scoped lang='scss'>
</style>
