<template>
  <div class="successPage">
      <img :src="$route.query.success == 1 ? successUrl : failUrl" alt="" class="successImg">
  </div>
</template>

<script>
export default {
  name: 'Success',
  props:  {
  },
  components:{ },
  data() {
    return {
			successUrl: '../../assets/img/rentSuccess.png',
			failUrl: '@/assets/img/rentFail.png'
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

</style>
