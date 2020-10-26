<template>
  <div class="activityCenter">
    <van-nav-bar
      title="我要报名"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    />
		<van-cell-group>
			<van-field v-model="form.enrollName" label="姓名" placeholder="请输入姓名" />
			<van-field v-model="form.phone" label="电话" placeholder="请输入电话" />
			<van-field v-model="form.enrollAddress" label="住址" placeholder="请输入住址" />
			<van-field v-model="form.idCard" label="身份证号码" placeholder="请输入身份证号码" />
		</van-cell-group>
		<van-button type="danger" round class="saveBtn" @click="addEnroll">提交</van-button>
  </div>
</template>

<script>
import { addEnroll } from "@/api/pokect";
export default {
  name: 'ActiveJoin',
  props: {
  },
  data() {
    return {
      welfareInfos: {},
      form: {
				welfareId: '',
				enrollName: '',
				idCard: '',
				phone: '',
				enrollAddress: '',
			}
    }
  },
  created(){
    this.form.welfareId = this.$route.query.id
  },
  filters:{
  },
  methods:{
    addEnroll() {
			if(this.form.enrollName === '' || this.form.idCard === '' || this.form.phone === '' || this.form.enrollAddress === '') {
        this.$notify({ type: "danger", message: '请将数据填写完整' });
				return
			}
      addEnroll(this.form).then((result) => {
        this.$notify({ type: "success", message: '提交成功' });
      }).catch((err) => {
        this.$notify({ type: "danger", message: err });
      })
    },
  }
}
</script>

<style scoped lang='scss'>
.activityCenter{
  background: #F8F9FB;
  min-height: 100vh;
}
.saveBtn{
  width: 80%;
  display: block;
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
