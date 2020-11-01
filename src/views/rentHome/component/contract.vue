<template>
  <div class="contract">
    <div class="dHeader">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="32px"
        class='backBtn'
        @click="$router.go(-1)"/>
    </div>
31232311
  </div>
</template>

<script>
import { roomInfo } from '@/api/room'

export default {
  name: 'contract',
  props: {
  },
  components:{ },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  filters: {
  },
  created() {

  },
 mounted() {
  },
  methods:{
  }
}
</script>

<style scoped lang='scss'>

</style>
