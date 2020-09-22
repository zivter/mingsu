<template>
  <div class="purseList">
    <div class="purseCard" v-for="item in purseList" :key="item.id">
      <div class="purseT overflow">
        <img :src="item.img" alt class="purse-img" />
        <div class="purseL float-left">
          <p class="title">{{ item.title }}</p>
          <p>创建时间：{{ item.startTime | timeFilter }}</p>
          <p>订单号：{{ item.orderId }}</p>
          <p>
            实付金额：{{ item.amount }}
            <span class="float-right">
              预估收益：
              <span class="text-red">¥{{item.futureIncome}}</span>
            </span>
          </p>
        </div>
      </div>
      <div class="purseBtm">
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { GetMyPurse } from '@/api/purse';  //还木有接口
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
      purseList: [
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
          orderId: "132132321",
          amount: 56.36,
          futureIncome: 63.33,
          img: "http://placehold.it/80x80",
        },
        {
          id: 1,
          title:
            "宝贝标题宝贝标题宝贝标题宝贝标贝标题宝贝贝标题宝贝贝标题宝贝 题...",
          startTime: "2020-03-20 10：30：21",
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
      //   this.purseList = result.result.items
      // }).catch((err) => {

      // });
    },
  },
};
</script>

<style scoped lang='scss'>
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
