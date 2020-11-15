<template>
  <div class="intro">
    <p class="introTitle">房源介绍</p>
    <p style="word-break:break-all;white-space: pre-line;" v-html="introData"></p>
  </div>
</template>

<script>
export default {
  name: '',
  props:  {
    introData:{
      type: String,
      required: false
    }
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
  }
}
</script>

<style scoped lang='scss'>
.intro{
  padding: 0 24px;
  margin-top: 50px;
}
.introTitle{
  font-size: 20px;
  font-weight: 700;
}
.contentTitle{
  margin-top: 16px;
  font-size: 15px;
  color: #000;
  font-weight: 700;
}
p{
  margin-top: 20px;
}
</style>
