<template>
  <div class="center">
    <div class="topBG">
      <div class="avator" @click="gotoProfile()">
        <van-image
          round
          fit='cover'
          width="72px"
          height="72px"
          class="avatorImg"
          :src="proFileData.headLogo"/>
        <p class="avatorP">{{ nickName }}</p>
      </div>
    </div>
    <div class="centerBtm">
      <van-row type="flex" justify="space-around" class="centermenu">
        <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'pending'}})"><p>{{ statusCounts.pending }}</p><p>待支付订单</p></van-col>
        <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'paid'}})"><p>{{ statusCounts.success }}</p><p>已支付订单</p></van-col>
        <van-col span="6" @click="$router.push({path:'/orderCenter',query:{type:'cancel'}})"><p>{{ statusCounts.fail }}</p><p>全部订单</p></van-col>
      </van-row>
      <div class="centerList">
        <van-cell title="我的优惠券" icon="location-o" is-link
        @click="$router.push({path:'/coupon'})" >
          <i slot='icon' class="centerIcon centerIcon1"></i>
        </van-cell>
        <!-- <van-cell title="我的收藏" icon="location-o" is-link
        @click="$router.push({path:'/collect'})" >
          <i slot='icon' class="centerIcon centerIcon2"></i>
        </van-cell> -->
        <van-cell title="入住人信息" icon="location-o" is-link
        @click="$router.push({path:'/occupant'})" >
          <i slot='icon' class="centerIcon centerIcon3"></i>
        </van-cell>
        <van-cell title="个人资料" icon="location-o" is-link
        @click="$router.push({path:'/profile'})" >
          <i slot='icon' class="centerIcon centerIcon4"></i>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { GetWechatProfile } from '@/api/account'
import { GetStatusCounts } from '@/api/orderQuery'
import { GetProfile } from '@/api/memberUser'
import share from '@/utils/share';
import tokenAuth from '@/utils/tokenAuth';

export default {
  name: 'Center',
  props:  {
  },
  components:{ },
  data() {
    return {
      proFileData:{},
      statusCounts:{},
      nickName:''
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  created() {
    share.share(this.$route.meta.title);
    tokenAuth.getAuth(this.$route.query, 'center');
    this.GetWechatProfile();
    this.GetStatusCounts();
    this.GetProfile();
  },
  mounted() {},
  methods:{
    /**
     * 获取个人信息
     */
    GetWechatProfile(){
      GetWechatProfile().then((result) => {
        this.proFileData = result.result
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    gotoProfile(){
      this.$router.push({
        path:'/profile'
      })
    },
    /**
     * 获取数量
     */
    GetStatusCounts(){
      GetStatusCounts().then((result) => {
        this.statusCounts = result.result
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /**
     * 获取昵称
     */
    GetProfile(){
      GetProfile().then((result) => {
        this.nickName = result.result.nickName
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
  }
}
</script>

<style scoped lang='scss'>
.center{
  height: 100vh;
  background: #F8F9FB;
}
.topBG{
  background: linear-gradient(to bottom left, rgb(243, 53, 66), rgb(243, 203, 93));
  height: 209px;
  position: relative;
  .shareBtn{
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 26px;
    color: #fff;
  }
  .avator{
    padding-top: 50px;
    .avatorImg{
      margin: 0 auto;
      display: block;
    }
    .avatorP{
      text-align: center;
      color: #fff;
      font-size: 15px;
      line-height: 40px;
    }
  }
}
.centerBtm{
  .centermenu{
    background: #fff;
    position: relative;
    top: -30px;
    margin: 0 14px;
    padding: 12px 14px;
    border-radius: 6px;
    p{
      text-align: center;
    }
    p:nth-child(1){
      color: #DA4F53;
      font-size: 20px;
    }
    p:nth-child(2){
      font-size: 13px;
      line-height: 36px;
      font-weight: 700;
      color: #444;
    }
  }
  .centerList{
    padding: 16px 16px;
    background: #fff;
    font-weight: 700;
    margin-top: -18px;
    .van-cell{
      margin: 5px 0;
      color: #444;
      font-size: 13px;
    }
    .van-cell:not(:last-child)::after{
      border-bottom: 0;
    }
    .centerIcon1{
      background: url('../../assets/img/centerIcon1.png') no-repeat center;
    }
    .centerIcon2{
      background: url('../../assets/img/centerIcon2.png') no-repeat center;
    }
    .centerIcon3{
      background: url('../../assets/img/centerIcon3.png') no-repeat center;
    }
    .centerIcon4{
      background: url('../../assets/img/profile.png') no-repeat center;
      width:24px!important;
      height:24px!important;
      margin-right: 14px!important;
    }
    .centerIcon{
      width: 18px;
      height: 18px;
      background-size: 100%;
      margin-right: 20px;
    }
  }

}

</style>
