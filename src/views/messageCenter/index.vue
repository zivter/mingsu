<template>
  <div class="messageCenter">

  </div>
</template>

<script>
import { messageList } from "@/api/center";
import Vue from 'vue'

export default {
  name: 'MessageCenter',
  props: {
  },
  data() {
    return {
    }
  },
  created(){
      this.messageList()
  },
  filters:{
  },
  methods:{
    messageList() {
			const param = {
				page: 1,
				limit: 20
			}
      messageList(param).then((result) => {
        this.messageList = result.result
      }).err((err) => {
        this.$notify({ type: "warning", message: err });
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
