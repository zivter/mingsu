<template>
  <div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
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
