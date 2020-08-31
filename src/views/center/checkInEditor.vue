<template>
  <div class="checkInEdit">
    <van-nav-bar
      title="入住人信息"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="checkInEditor">
      <van-cell-group>
        <van-field
          v-model="form.name"
          required
          clearable
          label="姓名"
          placeholder="请输入您的姓名"
          @click-right-icon="$toast('question')"/>
        <van-field
          label="性别"
          placeholder="请选择您的性别"
          @click="showSexPicker = true" >
          <p slot="input">{{ form.gender | sexFilters }}</p>
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
      </van-cell-group>

      <van-cell-group>
        <van-field
          readonly
          clickable
          required
          right-icon="arrow"
          label="证件类型"
          :value="form.identityNumberType"
          placeholder="请选择"
          @click="showcredTypePicker = true"/>
        <van-popup v-model="showcredTypePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="credTypecolumns"
            value-key='text'
            @cancel="showcredTypePicker = false"
            @confirm='getcredTypeConfirm'/>
        </van-popup>
        <van-field
          v-model="form.identityNumber"
          clearable
          label="证件号码"
          placeholder="请输入"
          required/>
        
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="form.phoneNumber"
          required
          clearable
          label="手机号码"
          placeholder="请输入手机号码"
          @click-right-icon="$toast('question')"/>
      </van-cell-group>
      
      <van-button type="default" size="large" class="deletebtn" v-if="form.id" @click="DeleteUserLodger">删除</van-button>

      <van-button type="danger" round class="saveBtn" @click='save'>保存</van-button>
      
      <van-button type="default" round class="closeEditor" v-if="editorType" @click='closeEditor'>返回</van-button>
    </div>
  </div>
</template>

<script>
import { GetUserLodger, CreateUserLodger, UpdateUserLodger, DeleteUserLodger } from '@/api/userLodger';
export default {
  name: 'checkInEditor',
  props:  {
    editorType:{
      type: Boolean,
      required: false
    }
  },
  components:{ },
  data() {
    return {
      sexColumns:[
        { text: '男',className:'Male' },
        { text: '女',className:'Female' }
      ],
      credTypecolumns:[
        { text: '身份证',className:'0' },
        { text: '军人证',className:'1' }
      ],
      showSexPicker:false,
      showcredTypePicker: false,
      form:{
        name:'',
        gender: "Male",
        identityNumberType: "",
        identityNumber: "",
        phoneNumber:''
      }
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
  },
  mounted() {
    this.GetUserLodger()
  },
  methods:{
    /**
     * 获取个人信息
     */
    GetUserLodger(){
      if(this.$route.query.id){
        const param = {
          id: this.$route.query.id
        }
        GetUserLodger(param).then((result) => {
          if(result.success){
            this.form = result.result
            this.form.gender = this.form.gender == 1 ? 'Male' : 'Female'
          }
        }).catch((err) => {
          
        });
      }
    },
    getcredTypeConfirm(data,index){
      this.form.identityNumberType = data.text
      this.showcredTypePicker = false
    },
    /**
     * 性别改变
     */
    sexOnConfirm(data, index){
      this.form.gender = data.className
      this.showSexPicker = false
    },
    /**保存 */
    save(){
      if(this.form.name == ''){
        this.$toast('请输入姓名')
        return
      }else if(this.form.identityNumberType == ''){
        this.$toast('请选择证件类型')
        return
      }else if(this.form.identityNumber == ''){
        this.$toast('请输入证件号')
        return
      }else if(this.form.phoneNumber == ''){
        this.$toast('请输入手机号')
        return
      }
      if(this.form.id){
        UpdateUserLodger(this.form).then((result) => {
          if(result.success == true){
            this.$notify({type:'success',message:'编辑成功'})
            if(this.editorType){
              this.$emit('closeEditor')
            }else{
              this.$router.go(-1)
            }
          }
        }).catch((err) => {
          this.$notify({type:'warning',message:err})
        });
      }else{
        CreateUserLodger(this.form).then((result) => {
          if(result.success == true){
            this.$notify({type:'success',message:'新增成功'})
            if(this.editorType){
              this.$emit('closeEditor')
            }else{
              this.$router.go(-1)
            }
          }
        }).catch((err) => {
          this.$notify({type:'warning',message:err})
        });
      }
    },
    /**删除 */
    DeleteUserLodger(){
      this.$dialog.confirm({
        message: '确认删除'
      }).then(() => {
        const param = {
          id: this.form.id
        }
        DeleteUserLodger(param).then((result) => {
          if(result.success){
            this.$notify({type:'success',message:'删除成功'})
            this.$router.go(-1)
          }
        }).catch((err) => {
          this.$notify({type:'warning',message:err})
        });
      }).catch(() => {
      });
    },
    closeEditor(){
      this.$emit('closeEditor')
    },
    onClickLeft(){
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped lang='scss'>
.deletebtn{
  .van-button__text{
    color: #DA4F53;
  }
  .van-button--default{
    color: #DA4F53;
    border: none;
    margin-top: 10px;
  }
}

.checkInEditor{
  background: #F8F9FB;
  min-height: 100vh;
  padding-top:10px;
}
.van-cell-group{
  margin-bottom: 10px;
}
.saveBtn{
  width: 300px;
  display: block;
  margin: 80px auto 0;
}
.closeEditor{
  width: 300px;
  display: block;
  margin: 10px auto 0;
}
</style>
