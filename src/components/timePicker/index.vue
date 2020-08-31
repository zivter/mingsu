<template>
  <div class="timePicker">
    <div class="overflow">
      <span @click="reset" class="reset">重置</span>
    </div>
    <van-row gutter="10" class="dateBtm" @click="timePopupshow = true">
      <van-col span="9">
        <p class="dateTime dateStart">{{ startDay | startDayFilter }}</p>
        <p class="dateExplain">14:00后入住</p>
      </van-col>
      <van-col span="6">
        <p class="dateTotal">共{{ totalDay }}晚</p>
      </van-col>
      <van-col span="9" class="right">
        <p class="dateTime dateEnd">{{ endDay | endDayFilter }}</p>
        <p class="dateExplain">14:00后离店</p>
      </van-col>
    </van-row>

    <van-calendar
      class="picker"
      title="日历"
      ref="calendar"
      :poppable="false"
      type="range"
      :formatter="formatter"
      @confirm="onConfirm"
      @select="onSelect"/>
  </div>
</template>

<script>
import moment from 'moment'
import { GetIdleDatesByDateRange } from '@/api/roomsQuery'
export default {
  name: 'timePicker',
  props: {
    timeRange:{
      type: String,
      required: false
    },
    roomId:{
      type: String,
      required: false
    }
  },
  data(){
    return{
      data: '',
      totalDay: 1,
      endDay: moment().add(1,'d').format('MM-DD'),
      startDay: moment().format('MM-DD'),
      dateList: []
    }
  },
  filters:{
    startDayFilter(val){
      if(!val){
        return '入店时间'
      }else{
        return val
      }
    },
    endDayFilter(val){
      if(!val){
        return '离店时间'
      }else{
        return val
      }
    }
  },
  computed: {

  },
  mounted(){
    this.GetIdleDatesByDateRange()
  },
  methods:{
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      if(!start || !end){
        this.$notify({type:'warning',message:'请选择入住时间和离店时间'})
        return
      }
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      var timeRange = moment(start).format('YYYY-MM-DD') + ',' + moment(end).format('YYYY-MM-DD')
      this.$emit('saveTimeRange', timeRange)
    },
    formatter(day) {
      // const month = day.date.getMonth() + 1;
      // const date = day.date.getDate();

      // if (month === 1) {
      //   if (date === 22) {
      //     day.type = 'disabled';
      //   } else if (date === 4) {
      //     day.topInfo = '五四青年节';
      //   }
      // }

      
      
      // this.dateList.forEach(element => {
      //   if(moment(day.date).format() == moment(element).format()){
      //     day.type = undefined;
      //   }
      // });
      if(this.dateList.indexOf(moment(day.date).format()) == -1){
        day.type = 'disabled';
      }
      if (day.type === 'start') {
        day.bottomInfo = '入住';

      } else if (day.type === 'end') {
        day.bottomInfo = '离店';
      }
      return day;
    },
    /**获取可选择日期 */
    GetIdleDatesByDateRange(){
      const param = {
        Id: this.roomId,
        from: moment().format('YYYY-MM-DD'),
        to: moment().add(6, 'M').format('YYYY-MM-DD'),
      }
      GetIdleDatesByDateRange(param).then((result) => {
        this.dateList = result.result.items
      }).catch((err) => {
        
      });
    },
    reset(){
      this.$refs.calendar.reset()
      this.totalDay = 1
      this.endDay = moment().add(1,'d').format('MM-DD'),
      this.startDay = moment().format('MM-DD')
    },
    onSelect(date){
      const [start, end] = date;
      if(end){
        for(var i = 0;i<moment(end-start).date()-1;i++){
          if(this.dateList.indexOf(moment(start).add(i,'d').format()) == -1){
            this.$notify({type:'warning',message:'请选择正确日期'})
            this.reset()
          }
        }
      }
      if(date[1]){
        this.totalDay = moment(end-start).date()-1
        this.endDay = moment(end).format('MM-DD')
      }else{
        this.startDay = moment(start).format('MM-DD')
      }
    },
  }
}
</script>

<style scoped lang='scss'>
.timePicker{
  z-index: 101;
}
.reset{
  float: right;
  display: block;
  margin: 16px 16px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  line-height: 21px;
}
.picker{
  height: calc(100vh - 78px - 38px);
  font-size: 13px;
}
.dateBtm{
  border-radius: 6px;
  padding: 12px 16px;
  .dateTotal{
    color: #DA4F53;
    background: #F9E4E5;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 12px;
    line-height: 20px;
  }
  .dateTime{
    line-height: 30px;
    font-size: 17px;
    font-weight: 700
  }
  .right{
    text-align: right;
  }
  .dateExplain{
    color: #B4B4B4;
    font-size: 12px;
    line-height: 24px;
  }
}
.picker /deep/ .van-calendar__header-title{
  display: none;
}
.picker /deep/ .van-calendar__day{
  font-size: 14px;
}
</style>
<style lang="scss">
.van-submit-bar__suffix-label{
  color: #666;
}
</style>
