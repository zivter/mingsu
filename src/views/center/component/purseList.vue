<template>
  <div class="profit">
    <van-list
      class="homeList"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了">
        <div class="purseCard" v-for="(item,index) in profit" :key="index">
          <div class="purseT overflow">
            <img v-if="purseType == 1" :src="item.cover" alt="" class="purse-img">
            <img v-else :src="GLOBAL.imgSrc2+item.cover" alt="" class="purse-img">
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
            <p>{{ item.roomTitle }}</p>
          </div>
        </div>
    </van-list>
    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多收益了...</div>
      <div slot="no-results" style='color:#666;font-size:13px;margin-top:10px;'>暂无收益...</div>
    </infinite-loading>
  </div>
</template>

<script>
// import { GetMyPurse } from '@/api/purse';  //还木有接口
import { profitList } from "@/api/pokect";
import moment from "moment";
export default {
  name: "purseList",
  props: {
    purseType: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      form: {
        page: 1,
        limit: 20
      },
      profit: []
    };
  },
  computed: {},
  watch: {},
  filters: {
    timeFilter(val) {
      return moment(val).format("YYYY.MM.DD");
    },
  },
  created() {},
  mounted() {
  },
  methods: {
    /**无线滚动 */
    infiniteHandler($state) {
      this.form.type = this.purseType
      profitList(this.form).then((result) => {
        this.profit.push(...result.data.records)
        if (result.data.records.length > 0) {
          this.form.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      })
    },

  },
};
</script>

<style scoped lang="scss">
.profit {
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
