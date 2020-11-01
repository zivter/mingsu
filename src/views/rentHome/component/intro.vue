<template>
  <div class="intro">
    <p class="introTitle">房源介绍</p>
    <p style="word-break:break-all;white-space: pre-line;">{{ introData }}</p>
    <!-- <p class="contentTitle">概要</p>
    <p>【有间雅阁】是一间高层全湖景公寓,坐落在珍珠半岛,交通便利｡小区对面就是千岛湖珍珠半岛广场,广场中央有无边水池､悬空观景台等｡广场边上有玩水之处 </p>
    <p>【千岛湖欢乐水世界】皮划艇､摩托艇､冲浪艇等应有尽有,让您在千岛湖来一场不寻常的旅行｡ 广场周边有千岛湖水之灵演艺中心､千岛湖博物馆､千岛湖图书馆和千岛湖青少年活动中心｡ </p> 
    <p>房间配套设施齐全,提供基本厨房用具,并为客人准备各类茶叶,希望每一位房客就如回家一样｡ </p> 
    <p class="contentTitle">房源细节</p>
    <p>【有间雅阁】高层全湖景公寓,1室1厨1卫结构｡干净整洁,依山傍水,有一个大阳台视野绝佳,拉开窗帘整片湖面尽收眼底｡晨起可看朝阳初升､傍晚可看日落西山｡闲暇时沏一壶茶,坐在阳台上,听听音乐静静地观看湖景｡</p> -->
  </div>
</template>

<script>
export default {
  name: '',
  props:  {
    introData:{
      type: String,
      required: false
    }
  },
  components:{ },
  data() {
    return {
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
.intro{
  padding: 0 24px;
  margin-top: 50px;
}
.introTitle{
  font-size: 20px;
  font-weight: 700;
}
.contentTitle{
  margin-top: 16px;
  font-size: 15px;
  color: #000;
  font-weight: 700;
}
p{
  margin-top: 20px;
}
</style>
