<template>
  <div class="feedback">
      <van-nav-bar
      title="问题与建议"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-field
			v-model="form.describe"
			rows="10"
			autosize
			type="textarea"
			placeholder="请输入留言"
			/>
		<van-button type="danger" round class="saveBtn" @click="addFeedback">提交</van-button>
  </div>
</template>

<script>
import { addFeedback } from '@/api/center';
export default {
  name: 'Feedback',
  props:  {
  },
  components:{ },
  data() {
    return {
			form: {
				describe: ''
			}
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
		onClickLeft(){
      this.$router.go(-1)
    },
		addFeedback() {
			addFeedback(this.form).then((result) => {
				this.$notify({ type: 'success', message: '提交成功' });
			}).catch((err) => {
				this.$notify({ type: 'danger', message: err });
			});
		}
  }
}
</script>

<style scoped lang='scss'>
.feedback{
  background: #F8F9FB;
  min-height: 100vh;
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
</style>
