<template>
  <div>
    <router-view/>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/" name="home" icon="home-o">
      <span>客房</span>
        <template #icon="props">
          <img :src="props.active ? './assets/img/centerOn.png' : './assets/img/centerOff.png' " />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item replace to="/ticket" name="friends" icon="credit-pay">门票</van-tabbar-item> -->
      <van-tabbar-item replace to="/center" name="setting" icon="user-o">
        <span>个人中心</span>
        <template #icon="props">
          <img :src="props.active ? '@/assets/img/centerOn.png' : '@/assets/img/centerOff.png' "/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'app',
  components: {},
  data() {
    return {
      active: 'home'
    }
  },
  filters: {
    dateFormate(val) {
      return moment(val).format('MM月DD日')
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
html,body{
  width: 100%;
  overflow-x: hidden;
}
body{
  left: 0px;
  right: 0px;
}
body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, html, iframe, input, li, ol, p, pre, td, textarea, th, ul{
  margin: 0;
  padding: 0;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.float-left{
  float: left;
}
.float-right{
  float: right;
}
.overflow{
  overflow: hidden;
}
</style>
