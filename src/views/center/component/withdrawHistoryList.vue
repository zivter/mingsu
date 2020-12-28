<template>
  <div class="withdrawList">
    <div v-if="withdrawList.length">
      <div class="purseCard"  v-for="(item,index) in withdrawList" :key="index">
        <div class="purseT overflow" @click="viewDetail(item)">
          <div class="purseL float-left">
            <p class="title">{{ item.extractState | extractStateFilter }}</p>
            <p>创建时间：{{ item.createTime | timeFilter }}</p>
          </div>
          <div class="purseR float-left">
            ¥<span>{{item.amount}}</span>
          </div>
        </div>
        <div class="purseBtm">
          <p>{{ item.remark }}</p>
        </div>
      </div>
    </div>

    <!-- 无线滚动 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" style='color:#999;font-size:13px;margin-top:10px;padding-bottom:20px;'>没有更多房源了...</div>
      <div slot="no-results" class="empty-in-your-area">
        <img src="../../../assets/img/emptybag.png" width="145px" alt="">
        <p>暂无数据，赶紧去下单赚佣金吧</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import { extractList } from '@/api/pokect';  //
import moment from "moment";
export default {
  name: "withdrawHistoryList",
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
        page: 1,
        limit: 20
      },
      withdrawList: [
      ],
    };
  },
  computed: {},
  watch: {},
  filters: {
    timeFilter(val) {
      return moment(val).format("YYYY.MM.DD");
    },
    extractStateFilter(val) {
      const statesList = ['已提交', '已完成', '失败']
      return statesList[val]
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    GetMyPurses() {
      var param = {
        CanUse: this.purseType,
        SkipCount: 0,
        MaxResultCount: 20,
      };
      // GetMyPurse(param).then((result) => {
      //   this.withdrawList = result.result.items
      // }).catch((err) => {

      // });
    },
    viewDetail(){

    },
    /**无线滚动 */
    infiniteHandler($state) {
      extractList(this.form).then((result) => {
        this.withdrawList.push(...result.data.records)
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
.withdrawList {
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
  width: 100%;
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
.purseR{
  line-height: 40px;
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
.empty-in-your-area{
  text-align: center;
  img{
    margin:100px auto 0;
  }
  p{
    margin-top:50px;
  }
}
</style>
