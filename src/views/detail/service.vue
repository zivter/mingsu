<template>
  <div class="service">
    <p class="serviceTitle">设施服务</p>

    <p class="contentTitle">居家设施</p>
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

    <p class="contentTitle">清洗用品</p>
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

    <p class="contentTitle">厨房用品</p>
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

    <p class="contentTitle">周边配套</p>
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

    <p class="contentTitle">娱乐设施</p>
    <van-grid
    :gutter="10"
    :border='false'
    style="margin-top:10px;">
      <van-grid-item
        v-for="(item) in Entertainment"
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
import { LoadAllBaseSupportings, LoadAllBathSupportings, LoadAllKitchenSupportings, LoadAllCheckInSupportings, LoadAllEntertainmentSupportings } from '@/api/room'
import nameJson from '../../icons/iconfont.json'

export default {
  name: '',
  props:  {
    facilitiesList:{
      type: Array,
      default: () => []
    }
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
      allCheckIn:[],
      Entertainment:[]
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
    this.LoadAllEntertainmentSupportings()
  },
  methods:{
    //所有居家设施
    LoadAllBaseSupportings(){
      this.overlayShow = true
      LoadAllBaseSupportings().then(data=>{
        this.filterIcon(data.result,this.allBase)
      }).catch(e => {
      }).finally(() => {
        this.overlayShow = false
      })
    },
    //所有清洗用品
    LoadAllBathSupportings(){
      LoadAllBathSupportings().then(data=>{
        this.filterIcon(data.result,this.allBath)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //所有厨房用品
    LoadAllKitchenSupportings(){
      LoadAllKitchenSupportings().then(data=>{
        this.filterIcon(data.result,this.allKitchen)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //所有周边配套
    LoadAllCheckInSupportings(){
      LoadAllCheckInSupportings().then(data=>{
        this.filterIcon(data.result,this.allCheckIn)
      }).catch(e => {
      }).finally(() => {
      })
    },
    //所有娱乐设施
    LoadAllEntertainmentSupportings(){
      LoadAllEntertainmentSupportings().then(data=>{
        this.filterIcon(data.result,this.Entertainment)
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
    },
    filterIcon(data,name){
      this.facilitiesList.forEach(element1 => {
        data.forEach(element2 => {
          if(element1.font_class == element2){
            name.push(element1)
          }
        });
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
  margin-top: 50px;
  padding: 0 24px;
  padding-bottom: 50px;
}
.contentTitle{
  margin-top: 16px;
  font-size: 15px;
  color: #000;
  font-weight: 700;
}
</style>
