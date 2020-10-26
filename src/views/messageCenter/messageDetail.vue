<template>
  <div class="MessageDetail">
    <van-nav-bar
      title="活动详情"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="activetyDetail">
      <p class="welTitle">{{ messageInfos.title }}</p>
      <div class="welData">
        <span class="welName">发布人：{{ messageInfos.createUserName }}</span>
        <span class="welTime">{{ messageInfos.signTime | timeFilter }}</span>
      </div>
      <p class="welArticle" style="" v-html="messageInfos.article"></p>
      <van-button type="danger" round class="saveBtn" @click="handleDetailClick" v-if="messageInfos.isSign === 1">我要报名</van-button>
    </div>
  </div>
</template>

<script>
import { messageInfo, messageEdit } from "@/api/center";
import Vue from 'vue'
import moment from 'moment';
export default {
  name: 'MessageDetail',
  props: {
  },
  data() {
    return {
      messageInfos: {},
      form: {
				id: ''
			}
    }
  },
  created(){
    this.form.id = this.$route.query.id
		this.getmessageInfo()
		this.messageEdit()
  },
  filters:{
    timeFilter(val) {
      return moment(val).format('YYYY-MM-DD HH-mm-ss')
    },
    articleFilter(val) {
      return val.replace('/tow/upload','https://www.shigvg77.cn/tow/upload')
    }
  },
  methods:{
    getmessageInfo() {
      messageInfo(this.form).then((result) => {
        const towIndex = result.data.article.indexOf('/tow')
        let str = result.data.article
        result.data.article = str.slice(0,towIndex)+'https://www.shigvg77.cn'+str.slice(towIndex)  //Hello-local,world!
        this.messageInfos = result.data
      }).catch((err) => {
        this.$notify({ type: "danger", message: err });
      })
    },
    handleDetailClick(item, index) {
      this.$router.push({
        path: 'activeJoin',
        query:{
          id: this.form.id
        }
      })
    },
    messageEdit(){
			messageEdit(this.form).then((result) => {
					
			}).catch((err) => {
					this.$notify({ type: "danger", message: err });
			});
    }
  }
}
</script>

<style scoped lang='scss'>
.MessageDetail{
  background: #F8F9FB;
  min-height: 100vh;
}
.activetyDetail{
  padding: 10px 12px;
}
.welTitle{
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
}
.welData{
  line-height: 24px;
  color: #666;
  font-size: 13px;
}
.welArticle{
  padding-bottom: 150px;
  word-break:break-all;
  white-space: pre-line;
  text-indent: 1em;
  p{
    word-break:break-all;
    white-space: pre-line;
    text-indent: 1em;
  }
}
.saveBtn{
  width: 80%;
  display: block;
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
