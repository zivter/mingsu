<template>
  <div class="service">
    <p class="serviceTitle">设施服务</p>

    <p class="contentTitle">基础设施</p>
    <van-grid
    :gutter="10"
    :border='false'
    style="margin-top:10px;">
      <van-grid-item
        v-for="(item) in allBase"
        :key="item.icon_id"
        :text="item.name">
        <template slot="icon">
          <svg-icon
          :icon-class="'#icon-' + item.font_class"
          font-size="22px"
          style="margin-bottom:10px;"/>
        </template>
      </van-grid-item>
    </van-grid>

    <p class="contentTitle">洗浴设施</p>
    <van-grid
    :gutter="10"
    :border='false'
    style="margin-top:10px;">
      <van-grid-item
        v-for="(item) in allBath"
        :key="item.icon_id"
        :text="item.name">
        <template slot="icon">
          <svg-icon
          :icon-class="'#icon-' + item.font_class"
          font-size="22px"
          style="margin-bottom:10px;"/>
        </template>
      </van-grid-item>
    </van-grid>

    <p class="contentTitle">厨房设施</p>
    <van-grid
    :gutter="10"
    :border='false'
    style="margin-top:10px;">
      <van-grid-item
        v-for="(item) in allKitchen"
        :key="item.icon_id"
        :text="item.name">
        <template slot="icon">
          <svg-icon
          :icon-class="'#icon-' + item.font_class"
          font-size="22px"
          style="margin-bottom:10px;"/>
        </template>
      </van-grid-item>
    </van-grid>

    <p class="contentTitle">入住服务</p>
    <van-grid
    :gutter="10"
    :border='false'
    style="margin-top:10px;">
      <van-grid-item
        v-for="(item) in allCheckIn"
        :key="item.icon_id"
        :text="item.name">
        <template slot="icon">
          <svg-icon
          :icon-class="'#icon-' + item.font_class"
          font-size="22px"
          style="margin-bottom:10px;"/>
        </template>
      </van-grid-item>
    </van-grid>
    <van-overlay :show="overlayShow" @click="overlayShow = false">
      <van-loading color="#DA4F53" style="top:0;left:0;right:0;bottom:0;position:absolute;margin:auto;width:30px;height:30px;"/>
    </van-overlay>


  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon/index'
import { LoadAllBaseSupportings, LoadAllBathSupportings, LoadAllKitchenSupportings, LoadAllCheckInSupportings } from '@/api/room'
import nameJson from '../../icons/iconfont.json'

export default {
  name: '',
  props:  {
  },
  components:{ svgIcon },
  data() {
    return {
      facilitiesList1:[
      ],
      overlayShow:false,
      allBase:[],
      allBath:[],
      allKitchen:[],
      allCheckIn:[]
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {
    this.LoadAllBaseSupportings()
    this.LoadAllBathSupportings()
    this.LoadAllKitchenSupportings()
    this.LoadAllCheckInSupportings()
  },
  methods:{
    //所有基础设施的key
    LoadAllBaseSupportings(){
      this.overlayShow = true
      LoadAllBaseSupportings().then(data=>{
         this.getIconCnName(data.result,this.allBase)
      }).catch(e => {
      }).finally(() => {
        this.overlayShow = false
      })
    },
    //所有洗浴设施key
    LoadAllBathSupportings(){
      LoadAllBathSupportings().then(data=>{
        this.getIconCnName(data.result,this.allBath)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //所有厨房设施key
    LoadAllKitchenSupportings(){
      LoadAllKitchenSupportings().then(data=>{
        this.getIconCnName(data.result,this.allKitchen)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //所有入住服务key
    LoadAllCheckInSupportings(){
      LoadAllCheckInSupportings().then(data=>{
        this.getIconCnName(data.result,this.allCheckIn)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //获取中文名
    getIconCnName(data,name){
      data.forEach(element => {
        for(var item of nameJson.glyphs){
          if(element == item.font_class){
            name.push(item)
            break
          }
        }
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.serviceTitle{
  font-weight: 700;
  font-size: 20px;
}
.service{
  height: 100%;
  margin-top: 50px;
  padding: 0 24px;
}
.contentTitle{
  margin-top: 16px;
  font-size: 15px;
  color: #000;
  font-weight: 700;
}
</style>
