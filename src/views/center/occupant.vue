<template>
  <div class="occupant">
    <van-nav-bar
      title="入住人信息"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-button type="default" size="large" icon="plus" @click="addOccupant">入住信息</van-button>
    <div class="overflow occupantCard" v-for="item in occupantList" :key="item.id" @click='occupantEdit(item)'>
      <div class="float-left">
        <p>{{ item.name }}</p>
        <p>手机号：{{ item.phoneNumber }}</p>
        <p>{{ item.identityNumberType }}：{{ item.identityNumber }}</p>
      </div>
      <div class="float-right"><van-icon name="arrow" class="occupantIcon"/></div>
    </div>
  </div>
</template>

<script>
import { GetAllUserLodger } from '@/api/userLodger';
export default {
  name: 'Occupant',
  props:  {
  },
  components:{ },
  data() {
    return {
      occupantList:[]
    }
  },
  computed: { 
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {
    this.GetAllUserLodger()
  },
  methods:{
    addOccupant(){
      this.$router.push('./checkInEditor')
    },
    GetAllUserLodger(){
      const param = {
        SkipCount:0,
        MaxResultCount:20
      }
      GetAllUserLodger(param).then((result) => {
        this.occupantList = result.result.items
      }).catch((err) => {
        
      });
    },
    occupantEdit(val){
      this.$router.push({
        path:'./checkInEditor',
        query:{
          id:val.id
        }
      })
    },
    onClickLeft(){
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped lang='scss'>
.occupant{  
  background: #F8F9FB;
  min-height: 100vh;
  padding-bottom: 30px;
}
.van-button__text{
  color: #DA4F53;
}
.van-button--default{
  color: #DA4F53;
  border: none;
  margin-top: 10px;
}
.occupantCard{
  background: #fff;
  margin-top: 10px;
  padding: 16px 24px;
  .occupantIcon{
    margin-top: 30px;
  }
  font-size: 13px;
  color: #B4B4B4;
  line-height: 20px;
  p:nth-child(1){
    font-weight: 700;
    color: #000;
    line-height: 30px;
    margin-bottom: 6px;
  }
}
</style>
