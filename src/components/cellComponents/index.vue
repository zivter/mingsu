<template>
  <van-row class="cellComponents" gutter="10">
    <van-col span="5" class="cellName">{{ cellName }}</van-col>
    <van-col span="19" class="cellValue" :style="{'color': cellColor}">{{ cellValue }}<slot name='right'></slot></van-col>
  </van-row>

</template>

<script>
export default {
  name: 'cellComponents',
  props: {
    cellName: {
      type: String,
      required: false
    },
    cellValue: {
      type: String,
      required: false
    },
    cellColor: {
      type: String,
      required: false
    },
  },
  computed: {
  }
}
</script>

<style scoped>
.cellComponents{
  margin-bottom: 10px;
}
.cellName {
  color: #B4B4B4;
  font-size: 13px;
  line-height: 22px;
}
.cellValue{
  color: #000;
  font-size: 13px;
  line-height: 22px;
}
</style>
