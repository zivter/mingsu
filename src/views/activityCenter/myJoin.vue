<template>
  <div class="activityCenter">
    <van-nav-bar
      title="我的报名"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-list
      class="homeList"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了">
        <div
        v-for="(item,index) in enrollLists"
        class="activeCard"
        :key='index'>
          <img :src="GLOBAL.imgSrc2+item.cover" alt="" class="activeImg">
					<div style="overflow:hidden;">
						<span class="activeTime float-left">{{ item.signTime | timeFilter }}</span>
						<span class="activeTitle float-right" @click="showInfo(item)">报名人信息 ></span>
					</div>
        </div>
    </van-list>
    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多信息了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无信息...</div>
    </infinite-loading>

		<van-overlay :show="show" @click="show = false">
			<div class="wrapper">
				<van-cell-group class="showContent">
					<van-field v-model="nowInfo.enrollName" readonly label="姓名" style="font-size:13px;"/>
					<van-field v-model="nowInfo.phone" readonly label="电话" style="font-size:13px;"/>
					<van-field v-model="nowInfo.enrollAddress" readonly label="住址" style="font-size:13px;"/>
					<van-field v-model="nowInfo.idCard" readonly label="身份证号码" style="font-size:13px;"/>
				</van-cell-group>
			</div>
		</van-overlay>

  </div>
</template>

<script>
import { enrollList } from "@/api/pokect";
import Vue from 'vue'
import moment from 'moment';

export default {
  name: 'MyJoin',
  props: {
  },
  data() {
    return {
      enrollLists: [],
      form: {
				page: 1,
				limit: 20
			},
			nowInfo: {},
			show: false
    }
  },
  created(){
  },
  filters:{
    timeFilter(val) {
      return moment(val).format('YYYY-MM-DD HH-mm-ss')
    }
  },
  methods:{
    getenrollList() {
      enrollList(this.form).then((result) => {
        this.enrollLists = result.result
      }).catch((err) => {
        this.$notify({ type: "danger", message: err });
      })
    },
    /**无线滚动 */
    infiniteHandler($state) {
      enrollList(this.form).then((result) => {
        this.enrollLists.push(...result.data.records)
        if (result.data.records.length>0) {
          this.form.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
      })
    },
		showInfo(item) {
			this.nowInfo = item
			this.show = true
		}
  }
}
</script>

<style scoped lang='scss'>
.activityCenter{
  background: #F8F9FB;
  min-height: 100vh;
}
.activeCard{
  overflow: hidden;
  background: #fff;
  margin: 3% 2%;
  border-radius: 2%;
  .activeImg{
    width: 100%;
    height: 180px;
    img{
      width:100%;
      height: 100%;
    }
  }
  .activeTime{
    font-size: 12px;
    line-height: 30px;
		margin-left: 10px;
  }
  .activeTitle{
    font-size: 12px;
    line-height: 30px;
		margin-right: 10px;
  }
}
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.showContent{
	border-radius: 6px;
	overflow: hidden;
	padding: 16px 6px;
	width: 68%;
	font-size: 13px;
}
.block {
	background-color: #fff;
}
</style>
