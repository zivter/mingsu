<template>
  <div class="messageCenter">
    <van-nav-bar
      title="消息中心"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-list
      class="messageList"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了">
        <div
        v-for="(item,index) in messageList"
        class="messageCard"
        :class="item.messageState === 1 ? 'hasread' : ''"
        :key='index'>
          <div class="messageCardTop">
            <img v-if="(item.messageType == 2 || item.messageType == 1) && item.cover" :src="GLOBAL.imgSrc2+item.cover" alt="" class="messageImg float-left">
            <div class="messageRight">
              <p>[{{ item.messageType | messageTypeFilter }}]</p>
              <p class="messageBody">{{ item.messageBody }}</p>
            </div>
          </div>
          <van-divider style="margin: 4px 0"/>
          <div class="messageBtm">
            <span class="messageTime">{{ item.createTime | timeFilter }}</span>
            <span class="messageBtn" @click="checkDetail(item)">点击查看</span>
          </div>
        </div>
    </van-list>
    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多信息了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无信息...</div>
    </infinite-loading>
  </div>
</template>

<script>
import { messageList } from "@/api/center";
import Vue from 'vue'
import moment from 'moment';

export default {
  name: 'MessageCenter',
  props: {
  },
  data() {
    return {
      form: {
				page: 1,
				limit: 20
      },
      messageList: []
    }
  },
  created(){
  },
  filters:{
    messageTypeFilter(val) {
      const type = ['报名', '订单', '佣金', '提现']
      return type[val]
    },
    timeFilter(val) {
      return moment(val).format('YYYY-MM-DD HH-mm-ss')
    }
  },
  methods:{
    /**无线滚动 */
    infiniteHandler($state) {
      messageList(this.form).then((result) => {
        this.messageList.push(...result.data.records)
        if (result.data.records.length>0) {
          this.form.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
        this.$notify({ type: "warning", message: err });
      })
    },
    checkDetail(val) {
      this.$router.push({
        path: 'messageDetail',
        query:{
          id: val.id,
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.messageCenter{
  background: #F8F9FB;
  min-height: 100vh;
  padding-bottom: 50px;
}
.messageList{
}
.hasread{
  color: #666;
}
.messageCard{
  background: #fff;
  margin: 10px 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 24px;
  padding: 10px 16px;
  .messageCardTop{
    display: flex;
    .messageImg{
      float: left;
      width: 70px;
      height: 70px;
      display: block;
      margin: 5px 10px 5px 0;
    }
    .messageRight{
      float: left;
      flex: 1;
      margin-top: 0px;
    }
    .messageBody{
      line-height: 24px;
    }
  }
  .messageBtm{
    overflow: hidden;
    font-size: 12px;
    .messageTime{
      float: left;
    }
    .messageBtn{
      float: right;
      color: #DA4F53;
    }
  }
}
</style>
