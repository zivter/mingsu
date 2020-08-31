<template>
  <div class="contact">
    <div class="contact1">
      <img src="@/assets/img/contactus.png" alt="" class="logo">
      <van-cell :border="false" title='宁波·总部' is-link  icon="home-o" >
        <template #default>
            <a :href="'tel:18668804008'">18668804008</a>
        </template>
      </van-cell>
      <van-cell :border="false" title='宁波·大公馆站' is-link  icon="location-o" >
        <template #default>
            <a :href="'tel:15957477775'">15957477775</a>
        </template>
      </van-cell>
      <van-cell :border="false" title='宁波·世纪广场站' is-link  icon="location-o" >
        <template #default>
            <a :href="'tel:15957477775'">15957477775</a>
        </template>
      </van-cell>
      <van-cell :border="false" title='宁波·外滩风景站' is-link  icon="location-o" >
        <template #default>
            <a :href="'tel:18858084802'">18858084802</a>
        </template>
      </van-cell>
      <van-cell :border="false" title='宁波·新典星座站' is-link  icon="location-o" >
        <template #default>
            <a :href="'tel:18858084802'">18858084802</a>
        </template>
      </van-cell>
    </div>
    <div class="contact2">
    </div>
      <van-cell :border="false" title='在线客服' value="跳转微信联系" is-link  icon="more-o" />
      <van-cell :border="false" title='客服电话' is-link  icon="service-o" >
        <template #default>
            <a :href="'tel:15957477775'">15957477775</a>
        </template>
      </van-cell>
      <van-cell :border="false" title='加盟咨询' is-link  icon="phone-o" >
        <template #default>
            <a :href="'tel:18658804008'">18658804008</a>
        </template>
      </van-cell>
  </div>
</template>

<script>
import { GetCommonSettings } from '@/api/configuration';
export default {
  name: '',
  props: {
  },
  data() {
    return {
      servicePhone: '',
      p:{
        phone: 18668804008
      }
    }
  },
  created(){
  },
  filters:{
  },
  methods:{
    GetCommonSettings(){
      GetCommonSettings().then((result) => {
        this.servicePhone = result.result.servicePhone
      }).catch((err) => {
        
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.contact{
  background: #f8f8f8;
  min-height: 100vh;
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
