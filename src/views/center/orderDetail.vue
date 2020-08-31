<template>
  <div class="detail">
    <van-nav-bar
      title="订单详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="dBody">
      <!-- 标题简介 -->
      <p class="title2">{{ orderData.roomTitle }}</p>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 入住时间 -->
      <van-row type="flex" justify="space-between" class="timeRange">  
        <van-col span="8">
          <p class="timeRangeT">入住</p>
          <p class="timeRangeTime">{{ orderData.from | timeFilter }}</p>
					<p class="timeRangeTime" style="font-size:12px">{{ orderData.from | weekFilter }}</p>
        </van-col>
        <van-col span="3" class="timeRangeAll"></van-col>
        <van-col span="8">
          <p class="timeRangeT timeRangeTitle2">退房</p>
          <p class="timeRangeTime timeRangeTime2">{{ orderData.to | timeFilters }}</p>
					<p class="timeRangeTime timeRangeTime2" style="font-size:12px">{{ orderData.to | weekFilters }}</p>
        </van-col>
      </van-row>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <!-- 位置 -->
      <!-- <div class="map">
        <p class="contentTitle">位置</p>
        <div class="amap-wrapper">
          <el-amap
          class="amap-box"
          vid="amap-vue"
          :center="detailData.locationMap | mapFilter"
          :position="center"
          :zoom="zoom">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker.positon" ></el-amap-marker>
          </el-amap>
        </div>
      </div>
			<van-divider :style="{borderColor: '#dcdcdc'}"/> -->
			<!-- 总价格 -->
			<div class='totalPrice'>
				<p class="totalPriceL">总费用</p>
				<p class="totalPriceR">¥ {{ orderData.payment }}</p>
			</div>
			<van-divider :style="{borderColor: '#dcdcdc'}"/>
			
      <!-- 预定须知 -->
      <div class="notice">
        <p class="contentTitle" style="margin-bottom:16px;">预定详情</p>
        <cell-components
        cell-name='购买者'
        :cell-value='orderData.buyerName'
        cell-color='#000'/>
        <cell-components
        cell-name='联系电话'
        :cell-value='orderData.buyerPhone'
        cell-color='#000'/>
        <cell-components
        cell-name='预定时间'
        :cell-value='orderData.creationTime | timeFilter'
        cell-color='#000'/>
        <cell-components
        cell-name='预定房号'
        :cell-value='orderData.RoomCode'
        cell-color='#000'/>
      </div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
			<div class='totalPrice'>
				<p class="totalPriceL">订单状态</p>
				<p class="totalPriceR">{{ orderData.status | statusFilter }}</p>
			</div>
      <van-divider :style="{borderColor: '#dcdcdc'}"/>
      <div class="btnContent">
        <van-button type="primary" round v-if="orderData.status == 'Pending'" class="saveBtn" @click="orderPayRequest">继续支付</van-button>
        <van-button type="danger" round v-if="orderData.status == 'Pending'" class="saveBtn" @click="orderCancel">取消支付</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import cellComponents from '@/components/cellComponents/index'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import moment from 'moment'
import { GetOrderDetail } from '@/api/orderQuery'
import { GetDetail } from '@/api/roomsQuery'
import { orderPayRequest, orderCancel } from '@/api/order'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f0c98a84e1c9266ebb51ee5316ee74b5',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


export default {
  name: 'detail',
  props: {
  },
  components:{ cellComponents },
  data() {
    return {
      detailData:{},
      facilitiesList:[],
      likeHeart: false,
      zoom: 13,
      center: [],
      markers: [],
      address: '',
      btnError: false,
      servicePopupshow: false,
      introPopupshow: false,
      timeRange:'',
      timeRangeInfo:{
        from:'入住时间',
        to:'退房时间',
        fromWeek:'',
        toWeek:'',
        total:''
      },
      timePopupshow:false,
      roomSelectPrice:'',
      rulishijian:'',
			wordTime:'',
			orderData:{}
    }
  },
  computed: {},
  watch: {},
  filters: {
    mapFilter(val){
      if(val){
        var list = []
        val.split(',').forEach(element => {
          list.push(Number(element))
        })
        list.reverse()
        return list
      }
    },
    weekFilter(val){
      if(val){
        return '周' + moment(val).isoWeekday()
      }
    },
    weekFilters(val){
      if(val){
        return '周' + moment(val).add(1, 'd').isoWeekday()
      }
    },
    timeFilter(val){
			if(val){
				return moment(val).format('MM-DD')
			}
		},
    timeFilters(val){
			if(val){
				return moment(val).add(1, 'd').format('MM-DD')
			}
		},
		statusFilter(val){
			if(val){
				const status = {
					Expired:'已过期',
					Pending:'代支付',
					Paid:'已支付',
					Refund:'已退款',
					Closed:'已关闭',
					Cancel:'已取消',
				}
				return status[val]
			}
		}
  },
  created() {
		this.GetOrderDetail()
		// this.GetDetail()
  },
 mounted() {
  },
  methods:{
    /**
     * 订单详情
     */
    GetOrderDetail(){
      GetOrderDetail(this.$route.query.id).then((result) => {
          this.orderData = result.result
      }).catch((err) => {
      });
    },
		/**
     * 获取客房详情
     */
    GetDetail(){
      GetDetail(this.$route.query.roomId).then((result) => {
        if(result.success == true){
          this.detailData = result.result
          this.getIconCnName(result.result.supporting.split(','),this.facilitiesList)
          let o = {
            position:[this.detailData.locationMap.split(',')[1],this.detailData.locationMap.split(',')[0]],
            visible:true
          }
          this.markers.push(o)
        }
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
		},
		onClickLeft(){
      this.$router.go(-1)
    },
    /** H5请求订单支付 */
    orderPayRequest(){
      const param = {
        orderNumber: this.orderData.orderNumber
      }
      orderPayRequest(param).then((result) => {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady(result.result.jsApiParameters);
        }
        
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /**调用微信支付api */
    onBridgeReady(jsApiParameters){
      var that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', JSON.parse(jsApiParameters),
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.$router.push({
              path: 'orderSuccess'
            })
          } 
        }
      ); 
    },
    /**取消支付 */
    orderCancel() {
      const param = {
        id: this.orderData.id
      }
      orderCancel(param).then((result) => {
        if (result.success) {
          this.$notify({type:'success',message:'退订成功'});
          location.reload()
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    }
  }
}
</script>

<style scoped lang='scss'>

.dHeader{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  width: 100%;
  .backBtn{
    float: left;
    display: block;
    margin: 10px 0 0 8px;
  }
  .heartBtn{
    float: right;
    display: block;
    margin: 10px 16px 0 0;
  }
}
.dSwiper{
  height: 227px;
  img{
    height: 100%;
    width: 100%;
  }
}
.title{
    font-size: 24px;
    font-weight: 700;
    color: #444;
}
.dBody{
  padding: 10px 20px;
  color: #333;
  .title1{
    color: #542813;
    font-size: 13px;
    line-height: 23.38px;
    font-weight: 700;
  }
  .title2{
    font-size: 18px;
    line-height: 36px;
    font-family: 'PingFangSC-Regular';
    font-weight: 700;
    color: #333;
  }
  .info{
    margin: 10px 0;
    .van-col{
      margin-bottom:5px;
    }
    font-size: 13px;
    .icon{
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .infoBox{
    font-size: 13px;
    padding-bottom: 10px;
    p{
      line-height: 22px;
    }
    .p1{
      font-weight: 700;
    }
    .icon{
      font-size: 30px;
      margin: 6px 14px 0 4px;
    }
    .van-col{
      border: 1px solid #d5d5d5;
      padding: 8px 8px;
      border-radius: 4px;
    }
  }
  .contentTitle{
    margin-top: 16px;
    font-size: 15px;
    color: #000;
    font-weight: 700;
  }
  .timeRange{
    margin-top: 20px;
    padding-bottom: 10px;
    .timeRangeT{
      color: #8D8D8D;
      font-size: 13px;
    }
    .timeRangeTitle2{
      text-align: right;
    }
    .timeRangeAll{
      color: #8D8D8D;
      font-size: 13px;
      line-height: 40px;
    }
    .timeRangeTime{
      color: #333;
      font-size: 17px;
      margin-top: 4px;
      font-weight: 700;
    }
    .timeRangeTime span{
      font-size: 13px;
    }
    .timeRangeTime2{
      text-align: right;
    }
  }
  .detail{
    .detailContent{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #000;
      line-height: 24px;
      margin-top: 10px;
      word-break:break-all;
    }
    .detailHandleClick{
      color: #DA4F53;
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
    }
  }
  .amap-wrapper {
    margin: 20px 0;
    width: 100%;
    height: 220px;
  }
  .defaultC{
    margin-left: 16px;
  }
  .defaultIcon{
    margin: 0 10px;
  }
  .defaultSpan{
    display: block;
    text-align: cell;
    font-size: 12px;
  }
  .notice2{
    padding-bottom: 80px;
  }
	.totalPrice{
		overflow: hidden;
		.totalPriceL{
			float: left;
		}
		.totalPriceR{
			float: right;
			font-weight: 700;
			font-size: 18px;
		}
	}
}
.detail{
	padding-bottom: 30px;
}
.btnContent{
  display: flex;
  justify-content: space-between;
}
.saveBtn{
  width: 40%;
  display: block;
  margin: auto;
  margin-bottom: 50px;
}
</style>
