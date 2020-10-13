<template>
  <div class="withdrawList">
    <div v-if="withdrawList.length">
      <div class="purseCard"  v-for="item in withdrawList" :key="item.id">
        <div class="purseT overflow" @click="viewDetail(item)">
          <div class="purseL float-left">
            <p class="title">提现成功</p>
            <p>创建时间：{{ item.startTime | timeFilter }}</p>
          </div>
          <div class="purseR float-left">
            ¥<span>{{item.amount}}</span>
          </div>
        </div>
        <div class="purseBtm">
          <p>{{ item.description }}</p>
        </div>
      </div>

    </div>
    <div v-else class="empty-in-your-area">
      <img src="../../../assets/img/emptybag.png" width="145px" alt="">
      <p>暂无数据，赶紧去下单赚佣金吧</p>
    </div>
  </div>
</template>

<script>
// import { GetMyPurse } from '@/api/purse';  //还木有接口
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
      withdrawList: [
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          status:'fail',
          img: "http://placehold.it/80x80",
        },
        {
          id: 2,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 3,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 4,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 5,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 6,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10:30:21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
      ],
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
      //   this.withdrawList = result.result.items
      // }).catch((err) => {

      // });
    },
    viewDetail(){

    }
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
