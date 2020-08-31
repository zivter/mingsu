<template>
  <div class="serveRoot">
    <!-- <p style="word-break:break-all;">serveRootUrl:{{ serveRootUrl }}</p>
    <p style="word-break:break-all;">key:{{ key }}</p>
    <p style="word-break:break-all;">encryptedCode:{{ encryptedCode }}</p> -->
    <p style="word-break:break-all;">serveResult:{{ serveResult }}</p>
  </div>
</template>

<script>
import { WechatH5Auth, WechatH5Bind } from '@/api/tokenAuth'
import Vue from 'vue'

export default {
  name: 'serveRoot',
  props: {
  },
  data() {
    return {
      serveRootUrl: 'url',
      serveResult: 'serveResult',
      key: 'key',
      encryptedCode: 'encryptedCode'
    }
  },
  created(){
    const that = this;
    that.serveRootUrl = that.$route.fullPath
    that.key = that.$route.query.key
    that.encryptedCod = that.$route.query.encryptedCod
    if (that.$route.query.encryptedCode) {
      that.WechatH5Bind(that.$route.query.key,that.$route.query.encryptedCode)
    }
    else {
      that.getWechatH5Auth(that.$route.query.encryptedCode)
    }
  },
  filters:{
  },
  methods:{
    onLoad(){
    },
    //获取encryptedCode
    getWechatH5Auth(encryptedCode){
      WechatH5Auth(Vue.prototype.url + 'serveRoot')
    },
    
    //微信认证cb
    WechatH5Bind (key,encryptedCode){
      const param = {
        "authProvider": "WechatH5",
        "providerKey": key,
        "providerAccessCode": encryptedCode
      }
      this.key = key
      this.encryptedCode = encryptedCode
      WechatH5Bind(param).then((result) => {
        this.serveResult = '绑定成功'
        this.$notify({type:'success',message:'绑定成功'})
      }).catch((err) => {
        this.serveResult = err
        this.$notify({type:'warning',message:err})
      });
    },
  }
}
</script>

<style scoped lang='scss'>
</style>
