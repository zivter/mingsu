<template>
  <div class="purseList">
    <van-list
      class="purseList"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了">
        <div class="purseCard" v-for="(item,index) in purseList" :key="index">
          <div class="purseT overflow">
            <img :src="GLOBAL.imgSrc2+item.cover" alt="" class="purse-img">
            <div class="purseL float-left">
              <p class="title">{{ item.roomTitle }}</p>
              <p>创建时间：{{ item.createTime | timeFilter }}</p>
              <p>订单号：{{ item.orderNumber }}</p>
              <p>
                实付金额：{{ item.amount }}
                <span class="float-right">
                  预估收益：
                  <span class="text-red">¥{{ item.spreadEstimate }}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="purseBtm">
            <p>{{ item.description }}</p>
          </div>
        </div>
    </van-list>
    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin:10px 0;padding-bottom:20px;'>没有更多信息了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin:10px 0;'>暂无信息...</div>
    </infinite-loading>
    
  </div>
</template>

<script>
// import { GetMyPurse } from '@/api/purse';  //还木有接口
import { billProfit } from "@/api/pokect";
import moment from "moment";
export default {
  name: "",
  props: {
    purseType: {
      type: Boolean,
      required: false,
    },
  },
  components: {},
  data() {
    return {
      form: {
        page: 0,
        limit: 20,
      },
      purseList: []
    };
  },
  computed: {},
  watch: {},
  filters: {
    timeFilter(val) {
      return moment(val).format("YYYY-MM-DD HH:dd:ss");
    },
  },
  created() {},
  mounted() {
    this.GetMyPurses();
  },
  methods: {
    GetMyPurses() {
      var param = {
        CanUse: this.purseType,
        SkipCount: 0,
        MaxResultCount: 20,
      };
      // GetMyPurse(param).then((result) => {
      //   this.purseList = result.result.items
      // }).catch((err) => {

      // });
    },
    /**无线滚动 */
    infiniteHandler($state) {
      billProfit(this.form).then((result) => {
        // const test = [{
        //   "amount": 100,
        //   "cover": "/tow/upload/20201017/1602949498001-981.png",
        //   "createTime": 1603804921110,
        //   "orderNumber": "Rt2020102422536641",
        //   "roomTitle": "测试的民宿标题，120平米高层",
        //   "spreadActual": 20.31,
        //   "spreadEstimate": 20.31
        // },{
        //   "amount": 100,
        //   "cover": "/tow/upload/20201017/1602949498001-981.png",
        //   "createTime": 1603804921110,
        //   "orderNumber": "Rt2020102422536641",
        //   "roomTitle": "测试的民宿标题，120平米高层",
        //   "spreadActual": 20.31,
        //   "spreadEstimate": 20.31
        // }]
        // this.purseList.push(...test)
        this.purseList.push(...result.data.records)
        if (result.data.records.length>0) {
          this.form.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      })
    },
  },
};
</script>

<style scoped lang="scss">
.purseList {
  margin-top: 10px;
}
.purseCard {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  margin-top: 10px;
  margin: 0 12px 12px 12px;
  padding: 8px;
  border-radius: 4px;
}
.text-red {
  color: #f53c28;
}
.purseL {
  color: #333;
  width: calc(100% - 95px);
  p:nth-child(1) {
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
  }
  p:nth-child(2) {
    font-size: 13px;
    line-height: 24px;
  }
}
.purseT {
  display: flex;
  justify-content: flex-start;
  .purse-img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border-radius: 4px;
  }
  p {
    font-size: 12px;
    font-weight: normal;
    color: #3f3f3f;
    &.title {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.purseBtm {
  color: #b4b4b4;
  font-size: 11px;
}
/deep/ .van-divider {
  margin: 10px 0;
}
</style>
