<template>
  <div class="occupant">
    <van-button type="default" size="large" icon="edit" @click="tooccupant">入住人管理</van-button>

    <van-radio-group v-model="result">
      <div class="overflow occupantCard" v-for="(item,index) in occupantList" :key="item.id" @click="cardClick(index)">
        <van-radio :name="index" ref="checkboxes" class="float-left checkbox" />
        <div class="float-left">
          <p>{{ item.name }}</p>
          <p>{{ item.identityNumberType }}：{{ item.identityNumber }}</p>
        </div>
        <!-- <div class="float-right"><van-icon name="arrow" class="occupantIcon" @click='occupantEdit(item)'/></div> -->
      </div>
    </van-radio-group>

    <van-button type="danger" round class="saveBtn" @click="save">保存</van-button>

    <!-- 添加入住入 -->
    <van-popup
    v-model="personPopupshow"
    closeable
    position="bottom"
    :style="{ height: '100%' }">
      <checkin-editor :editorType='true' @closeEditor='closeEditor'/>
    </van-popup>

  </div>
</template>

<script>
import { GetAllUserLodger } from '@/api/userLodger'
import checkinEditor from '@/views/center/checkInEditor';
export default {
  name: 'Occupant',
  props:  {
    userLodgerIdList:{
      type:Array,
      required:false
    }
  },
  components:{ checkinEditor },
  data() {
    return {
      occupantList:[],
      result:[],
      personPopupshow: false
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
        MaxResultCount:100
      }
      GetAllUserLodger(param).then((result) => {
        this.occupantList = result.result.items
        if(this.userLodgerIdList && this.userLodgerIdList.length > 0){
          this.userLodgerIdList.forEach(item1 => {
            this.occupantList.forEach((item2,index) => {
              if(item2.id == item1.id){
                this.result.push(index)
              }
            })
          })
        }
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
    cardClick(item){
      this.$refs.checkboxes[item].toggle();
    },
    save(){
      this.$emit('saveOccupant',this.occupantList[this.result])
    },
    closeEditor(){
      this.personPopupshow = false
      this.GetAllUserLodger()
    },
    tooccupant(){
      this.$router.push({
        path:'./occupant',
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.occupant{  
  background: #F8F9FB;
  min-height: 100vh;
  padding-bottom: 80px;
  padding-top: 40px;
}
.van-button__text{
  color: #DA4F53;
}
.van-button--default{
  color: #DA4F53;
  border: none;
}
.occupantCard{
  background: #fff;
  margin-top: 10px;
  padding: 16px 24px;
  .checkbox{
    margin: 16px 20px 0 0;
  }
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
  }
}
.saveBtn{
  width: 80%;
  display: block;
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
}
.saveBtn .van-button__text{
  color: #fff;
}
</style>
