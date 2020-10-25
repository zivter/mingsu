<template>
  <div class="center">
    <div class="centerContent">
      <div class="topBG">
        <div class="avator" @click="gotoProfile()">
          <van-image
            round
            fit="cover"
            width="72px"
            height="72px"
            class="avatorImg"
            :src="proFileData.headLogo"
          />
          <p class="avatorP">{{ nickName }}</p>
        </div>
      </div>
      <div class="centerBtm">
        <!-- <van-row type="flex" justify="space-around" class="centermenu">
          <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'pending'}})"><p>{{ statusCounts.pending }}</p><p>待支付订单</p></van-col>
          <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'paid'}})"><p>{{ statusCounts.success }}</p><p>已支付订单</p></van-col>
          <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'cancel'}})"><p>{{ statusCounts.fail }}</p><p>全部订单</p></van-col>
        </van-row>-->
        <van-row type="flex" justify="space-around" class="centermenu">
          <van-col
            span="12"
            @click="$router.push({path:'/coupon',query:{type:'pending'}})"
            style="border-right:1px solid #aaa;"
          >
            <p>优惠券</p>
          </van-col>
          <van-col span="12" @click="$router.push({path:'/purse',query:{type:'paid'}})">
            <p>钱包</p>
          </van-col>
        </van-row>

        <div class="centerOrder">
          <p class="orderTitle">名宿订单</p>
          <van-row type="flex" justify="space-around">
            <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'pending'}})">
              <div style="position:relative">
                <svg class="icon orderIcon" aria-hidden="true">
                  <use xlink:href="#icon-zu2491"></use>
                </svg>
                <span class="badges" v-if="statusCounts.pending!=0">{{ statusCounts.pending >= 99 ? '99+' : statusCounts.pending }}</span>
              </div>
              <p class="orderName">代付款</p>
            </van-col>
            <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'paid'}})">
              <div style="position:relative">
                <svg class="icon orderIcon" aria-hidden="true">
                  <use xlink:href="#icon-zujian9111"></use>
                </svg>
                <span class="badges" v-if="statusCounts.success!=0">{{ statusCounts.success >= 99 ? '99+' : statusCounts.success }}</span>
              </div>
              <p class="orderName">已支付</p>
            </van-col>
            <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'expired'}})">
              <div style="position:relative">
                <svg class="icon orderIcon" aria-hidden="true">
                  <use xlink:href="#icon-zu2501"></use>
                </svg>
                <span class="badges" v-if="statusCounts.fail!=0">{{ statusCounts.fail >= 99 ? '99+' : statusCounts.fail }}</span>
              </div>
              <p class="orderName">未成功</p>
            </van-col>
            <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'cancel'}})">
              <div style="position:relative">
                <svg class="icon orderIcon" aria-hidden="true">
                  <use xlink:href="#icon-zu432"></use>
                </svg>
                <span class="badges" v-if="statusCounts.total!=0">{{ statusCounts.total >= 99 ? '99+' : statusCounts.total }}</span>
              </div>
              <p class="orderName">全部</p>
            </van-col>
          </van-row>
        </div>

        <div class="centerList">
          <van-cell title="租房订单" icon="location-o" is-link @click="$router.push({path:'/coupon'})">
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-renew"></use>
            </svg>
          </van-cell>
          <van-cell
            title="消息中心"
            icon="location-o"
            is-link
            @click="$router.push({path:'/messageCenter'})"
          >
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-xiaoxi3"></use>
            </svg>
          </van-cell>
          <van-cell title="营销中心" icon="location-o" is-link @click="$router.push({path:'/activityCenter'})">
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-yingxiaozhongxin1"></use>
            </svg>
          </van-cell>
          <van-cell
            title="入住人信息"
            icon="location-o"
            is-link
            @click="$router.push({path:'/occupant'})"
          >
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-zu2601"></use>
            </svg>
          </van-cell>
          <van-cell title="我的资料" icon="location-o" is-link @click="$router.push({path:'/profile'})">
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-gerenxinxi"></use>
            </svg>
          </van-cell>
          <van-cell title="意见反馈" icon="location-o" is-link @click="$router.push({path:'/feedback'})">
            <svg class="icon orderIcon2" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-gerenxinxi"></use>
            </svg>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { GetWechatProfile } from "@/api/account";
import { GetStatusCounts } from "@/api/orderQuery";
import { GetProfile } from "@/api/memberUser";
import share from "@/utils/share";
import tokenAuth from "@/utils/tokenAuth";

export default {
  name: "Center",
  props: {},
  components: {},
  data() {
    return {
      proFileData: {},
      statusCounts: {
        pending: 0,
        success: 0,
        fail: 0,
        total: 0
      },
      nickName: "",
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query, "center");
    this.GetWechatProfile();
    this.GetStatusCounts();
    this.GetProfile();
  },
  mounted() {},
  methods: {
    /**
     * 获取个人信息
     */
    GetWechatProfile() {
      GetWechatProfile()
        .then((result) => {
          this.proFileData = result.result;
        })
        .catch((err) => {
          this.$notify({ type: "warning", message: err });
        });
    },
    gotoProfile() {
      this.$router.push({
        path: "/profile",
      });
    },
    /**
     * 获取数量
     */
    GetStatusCounts() {
      GetStatusCounts()
        .then((result) => {
          this.statusCounts = result.result;
        })
        .catch((err) => {
          this.$notify({ type: "warning", message: err });
        });
    },
    /**
     * 获取昵称
     */
    GetProfile() {
      GetProfile()
        .then((result) => {
          this.nickName = result.result.nickName;
        })
        .catch((err) => {
          this.$notify({ type: "warning", message: err });
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.center {
  height: calc(100vh - 50px);
  background: #f5f5f5;
}
.centerContent {
  background: #f5f5f5;
  padding-bottom: 10px;
}
.topBG {
  background: url("../../assets/img/centerBG.png") no-repeat center;
  background-size: 100% 100%;
  height: 174px;
  position: relative;
  .shareBtn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 26px;
    color: #fff;
  }
  .avator {
    padding-top: 20px;
    .avatorImg {
      margin: 0 auto;
      display: block;
    }
    .avatorP {
      text-align: center;
      color: #fff;
      font-size: 22px;
      line-height: 40px;
    }
  }
}
.centerBtm {
  .centermenu {
    background: #fff;
    position: relative;
    top: -40px;
    margin: 0 14px;
    padding: 12px 14px;
    border-radius: 6px;
    p {
      text-align: center;
    }
    p:nth-child(1) {
      font-size: 16px;
      line-height: 36px;
      font-weight: 700;
      color: #666;
    }
  }
  .centerOrder {
    margin: -15px 14px 16px;
    background: #fff;
    margin-top: -18px;
    border-radius: 6px;
    .orderTitle {
      font-weight: 800;
      font-size: 12px;
      font-size: 15px;
      color: #000;
      line-height: 40px;
      margin-left: 24px;
      margin-bottom: 10px;
    }
    .orderName {
      font-size: 12px;
      text-align: center;
      line-height: 40px;
      color: #000;
    }
    .centerSpirt {
      display: block;
      background: url("../../assets/img/centerSp.png") no-repeat center;
      zoom: 0.25;
      margin: 0 auto;
    }
    .Spirt1 {
      height: 88px;
      width: 96px;
      background-position: 0 0;
    }
    .Spirt2 {
      height: 96px;
      width: 96px;
      background-position: 0 -88px;
    }
    .Spirt3 {
      height: 96px;
      width: 96px;
      background-position: 0 -184px;
    }
    .Spirt4 {
      height: 96px;
      width: 81px;
      background-position: 0 -280px;
    }
  }
  .centerList {
    margin: 0 14px;
    padding: 10px 12px;
    background: #fff;
    font-weight: 700;
    border-radius: 6px;
    .van-cell {
      margin: 5px 0;
      color: #444;
      font-size: 13px;
    }
    .centerSpirt {
      display: block;
      background: url("../../assets/img/centerSp.png") no-repeat center;
      zoom: 0.25;
      margin: 0 auto;
    }
    .van-cell__title {
      margin-left: 10px;
    }
    .centerSpirt5 {
      height: 76px;
      width: 76px;
      background-position: 0 -376px;
    }
    .centerSpirt6 {
      height: 72px;
      width: 72px;
      background-position: 0 -452px;
    }
    .centerSpirt7 {
      height: 72px;
      width: 72px;
      background-position: 0 -524px;
    }
    .centerSpirt8 {
      height: 64px;
      width: 80px;
      background-position: 0 -596px;
    }
    .centerSpirt9 {
      height: 72px;
      width: 81px;
      background-position: 0 -660px;
    }
  }
}
.orderIcon{
  margin: 0 auto;
  display: block;
  font-size: 24px;
}
.orderIcon2{
  font-size: 18px;
  margin-top: 2px;
}
.badges{
  position: absolute;
  right: 20px;
  top: -10px;
  background: red;
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
  padding: 0 5px;
  line-height: 18px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
  background-color: #ee0a24;
  border: 1px solid #fff;
  border-radius: 16px;

}
</style>
