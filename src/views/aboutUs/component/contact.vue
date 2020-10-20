<template>
  <div class="contact">
    <img src="@/assets/img/aboutus3.png" alt="" class="banner">
    <p class="contactTitle">请填写您的联系信息</p>
    <van-field :border='false' label="姓名" class="formContent" placeholder="请输入您的真实姓名" v-model="form.clientName" />
    <van-field :border='false' label="电话" class="formContent" placeholder="请输入您的联系电话" v-model="form.phone" />
    <van-field :border='false' label="住址" class="formContent" placeholder="请输入您的住址信息" v-model="form.clientAddress" />
    <van-button type="danger" round class="saveBtn" @click="addCollaborate">警告按钮</van-button>
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
      servicePhone: '',
      p:{
        phone: 18668804008
      },
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
      addCollaborate().then((result) => {
      }).catch((err) => {
        Notify({ type: 'danger', message: err });
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
  .saveBtn{
    width: 80%;
    display: block;
    position: fixed;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: auto;
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
