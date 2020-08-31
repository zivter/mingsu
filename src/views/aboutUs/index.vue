<template>
  <div class="aboutUs">
    <van-tabs v-model="active">
      <van-tab title="公司介绍">
        <introduce />
      </van-tab>
      <van-tab title="公司加盟">
        <join-us />
      </van-tab>
      <van-tab title="联系我们">
        <contact />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import introduce from './component/introduce';
import joinUs from './component/joinUs';
import contact from './component/contact';
import share from '@/utils/share';

export default {
  name: 'aboutUs',
  components:{
    introduce,
    joinUs,
    contact
  },
  props: {
  },
  data() {
    return {
      active: 0
    }
  },
  created(){
    share.share(this.$route.meta.title);
  },
  filters:{
  },
  methods:{
  }
}
</script>

<style scoped lang='scss'>
</style>
