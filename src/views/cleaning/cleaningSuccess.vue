<template>
  <div class="success">
    <p class="successP">保存成功</p>
    <a class="backIndex" @click="backIndex">返回首页</a>
  </div>
</template>

<script>
export default {
  name: '',
  props:  {
  },
  components:{ },
  data() {
    return {
    }
  },
  computed: { 
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {},
  methods:{
    backIndex(){
      this.$router.push({
        path:'index'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.successP{
  font-size: 30px;
  line-height: 40px;
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
.backIndex{
  color: green;
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 10px;
  font-size: 14px;
}
</style>
