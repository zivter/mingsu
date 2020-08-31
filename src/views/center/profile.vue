<template>
  <div class="profile">
    <van-nav-bar
      title="个人资料"
      left-arrow
      @click-left="back"/>
    <van-field
      label="昵称"
      placeholder="请输入您的昵称"
      v-model="fieldForm.nickName">
    </van-field>
    <van-field
      label="性别"
      placeholder="请选择您的性别"
      @click="showSexPicker = true" >
      <p slot="input">{{ fieldForm.gender | sexFilters }}</p>
      <van-icon slot="right-icon" name="arrow" />
    </van-field>
    <!--性别选择器-->
    <van-popup v-model="showSexPicker" position="bottom">
      <van-picker
      :columns="sexColumns"
      value-key='text'
      show-toolbar
      @confirm="sexOnConfirm"
      @cancel='showSexPicker = false'/>
    </van-popup>

    <van-field
      v-model="fieldForm.birthdayFormat"
      readonly
      clickable
      label="年龄"
      placeholder="请选择您的年龄"
      @click="numKeyShow = true"/>
    <!--年龄-->
    <van-popup v-model="numKeyShow" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        v-model="fieldForm.birthday"
        @confirm='birthdayConfirm'
        @cancel='numKeyShow = false'
        @blur="numKeyShow = false"/>
    </van-popup>
      
    <van-field
      readonly
      clickable
      label="家乡"
      :value="fieldForm.hometownName"
      placeholder="请选择您的家乡"
      @click="showCityPicker = true;showCityPickerType = 1;" >
      <van-icon slot="right-icon" name="arrow" />
    </van-field>
    <van-field
      readonly
      clickable
      label="所在城市"
      :value="fieldForm.currentCityName"
      placeholder="选择您常待的城市"
      @click="showCityPicker = true;showCityPickerType = 2;" >
      <van-icon slot="right-icon" name="arrow" />
    </van-field>

    <van-field
      v-model="fieldForm.education"
      label="教育"
      placeholder="请填写您的教育背景"/>
    <van-field
      v-model="fieldForm.industry"
      label="行业"
      placeholder="请填写您工作的行业"/>


    <!--城市选择器-->
    <van-popup v-model="showCityPicker" position="bottom">
      <van-area :area-list="areaList" value="110101" @cancel='showCityPicker = false' @confirm='confirm'/>
    </van-popup>
    <!--教育选择器-->
    <van-popup v-model="showEducatePicker" position="bottom">
      <van-picker :columns="educateColumns" show-toolbar @change="onChange" />
    </van-popup>


    <van-button type="danger" round class="saveBtn" @click="UpdateProfile">保存</van-button>

    <!-- loading -->
    <van-overlay :show="loading" @click="loading = false">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-overlay>


  </div>
</template>

<script>
import areaList from '@/assets/json/area'
import { GetProfile, UpdateProfile } from '@/api/memberUser'
import moment from 'moment'

export default {
  name: '',
  props:  {
  },
  components:{ },
  data() {
    return {
      fieldForm: {
        gender:'',
        birthday:'',
        birthdayFormat:'',
        hometown:'',
        currentCityName:'',
        education:'',
        industry:''
      },
      showCityPicker: false,
      showSexPicker: false,
      showEducatePicker: false,
      areaList: areaList,
      showCityPickerType:null,
      sexColumns:[
        { text: '男',className:'Male' },
        { text: '女',className:'Female' }
      ],
      educateColumns:[],
      numKeyShow: false,
      loading:false,
      birthday:'',
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    sexFilters(val){
      const sexColumns = {Male:'男',Female:'女'}
      return sexColumns[val]
    }
  },
  created() {
    this.GetProfile()
  },
  mounted() {},
  methods:{
    back(){
      this.$router.go(-1)
    },
    confirm(val){
      if(this.showCityPickerType == 1){
        this.fieldForm.hometownName = val.map(item => item.name).join()
        if(val[2]){
          this.fieldForm.hometown = val[2].code
        }
      }else{
        this.fieldForm.currentCityName = val.map(item => item.name).join()
        if(val[2]){
          this.fieldForm.currentCity = val[2].code
        }
      }
      this.showCityPicker = false
    },
    onChange(picker, index) {
      this.$toast(`当前值：${picker}, 当前索引：${index}`);
    },
    /**
     * 性别改变
     */
    sexOnConfirm(data, index){
      this.fieldForm.genderName = data.text
      this.fieldForm.gender = data.className
      this.showSexPicker = false
    },
    birthdayConfirm(val){
      this.fieldForm.birthday = moment(val).format()
      this.fieldForm.birthdayFormat = moment(val).format('YYYY-MM-DD')
      this.numKeyShow = false
    },

    /**
     * 获取个人信息
     */
    GetProfile(){
      this.loading = true
      GetProfile().then((result) => {
        this.fieldForm = result.result
        if(result.result.birthday){
          this.fieldForm.birthdayFormat = moment(result.result.birthday).format('YYYY-MM-DD')
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      }).finally(() => {
        this.loading = false
      });
    },
    /**
     * 设置个人信息
     */
    UpdateProfile(){
      this.loading = true
      UpdateProfile(this.fieldForm).then((result) => {
        if(result.success == true){
          this.$notify({type:'success',message:'保存成功'})
          this.$router.go(-1)
        }
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      }).finally(() => {
        this.loading = false
      });
    }

  }
}
</script>

<style scoped lang='scss'>
.profile{
  background: #F8F9FB;
}
.van-field{
  padding: 18px 26px;
}
.saveBtn{
  width: 300px;
  display: block;
  margin: 80px auto 0;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
