<template>
  <div class="contact">
    <img src="@/assets/img/aboutus3.png" alt="" class="banner">
    <p class="contactTitle">请填写您的联系信息</p>
    <van-field :border='false' label="姓名" class="formContent" placeholder="请输入您的真实姓名" v-model="form.clientName" />
    <van-field :border='false' label="电话" class="formContent" placeholder="请输入您的联系电话" v-model="form.phone" />
    <van-field :border='false' label="住址" class="formContent" placeholder="请输入您的住址信息" v-model="form.clientAddress" />
    <van-button type="danger" round class="saveBtn" @click="addCollaborate">提交</van-button>
  </div>
</template>

<script>
import { addCollaborate } from '@/api/aboutus';
export default {
  name: '',
  props: {
  },
  data() {
    return {
      form: {
        clientName: '',
        phone: '',
        clientAddress: ''
      }
    }
  },
  created(){
  },
  filters:{
  },
  methods:{
    addCollaborate(){
      addCollaborate(this.form).then((result) => {
        this.$notify({ type: 'success', message: '提交成功' });
      }).catch((err) => {
        this.$notify({ type: 'danger', message: err });
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.contact{
  background: #fff;
  height: calc(100vh - 44px);
  .contactTitle{
    text-align: center;
    font-size: 13px;
    line-height: 36px;
  }
  .formContent{
    padding: 12px 30px;
  }
  .banner{
    width: 100%;
  }
  .saveBtn{
    width: 80%;
    display: block;
    margin: 16px auto 80px;
  }
  .contact1{
    background: #fff;
  }
  .contact2{
    background: #fff;
    margin-top: 20px;
  }
  .logo{
    margin: 0 auto;
    padding: 40px 0 30px 0;
    display: block;
    height: 35px;
  }
  a{
    color: #666;
  }
}
</style>
