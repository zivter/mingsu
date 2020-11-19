<template>
  <div>
    <router-view/>
    <van-tabbar v-model="active" route active-color="#000" inactive-color="#000">
      <van-tabbar-item replace to="/" name="home" icon="home-o">
        <template #icon="props">
          <!-- <img :src="props.active ? homeOn : homeOff "/> -->
          <van-icon :name="props.active ? 'wap-home' : 'wap-home-o'" size="26" style="margin-top:6px"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/rentHome" name="home" icon="home-o">
        <template #icon="props">
          <!-- <img :src="props.active ? homeOn : homeOff "/> -->
          <van-icon :name="props.active ? 'shop' : 'shop-o'" size="26" style="margin-top:6px"/>
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item replace to="/ticket" name="friends" icon="credit-pay">门票</van-tabbar-item> -->
      <van-tabbar-item replace to="/center" name="setting" icon="user-o">
        <template #icon="props">
          <!-- <img :src="props.active ? centerOn : centerOff "/> -->
          <van-icon :name="props.active ? 'manager' : 'manager-o'" size="26" style="margin-top:6px"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import moment from 'moment';
import centerOff from '@/assets/img/centerOff.png';
import centerOn from '@/assets/img/centerOn.png';
export default {
  name: 'app',
  components: {},
  data() {
    return {
      centerOff,
      centerOn,
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
