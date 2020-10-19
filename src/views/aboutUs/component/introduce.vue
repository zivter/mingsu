<template>
  <div class="introduce">
   <p class="p1">我们是谁？</p>
   <p class="p2">2018年6月我们再次选择这条从0到1的人生道路 三套公寓房，我们用彼此的休息时间，学习，模仿，设计，装修；每天的深夜24点我们带着一身的疲惫，走进附近的一家馆子，聊一聊公寓房的名字 【白米范】一个带着生活味道，带着心中梦想的品牌静静的诞生 2019年【白米范】品牌所属公司米伽商务信息通过第一轮融资，组建新公司——浙拾光，由此我们拉开了新的篇章......</p>
   <p class="p1">我们希望什么？</p>
   <p class="p2">我们希望为自己在这个世界留下点属于我们有价值的印记； 我们希望为家人创造一个有牛奶有面包的生活条件 我们希望为你们提供在旅途中，在出差中，在异地他乡的一个家，一个你们习惯而喜欢的生活味道</p>
   <p class="p1">我们坚持什么？</p>
   <p class="p2">坚持不走捷径，踏踏实实做一件事；坚持以人为本，开心服务快乐居住；我们坚持团结在一起，向远方，在路上</p>
  </div>
</template>

<script>
export default {
  name: 'introduce',
  props: {
  },
  data() {
    return {
    }
  },
  created(){
   
  },
  filters:{
  },
  methods:{
  }
}
</script>

<style scoped lang='scss'>
.introduce{
    padding: 20px 20px 40px;
    background: #f8f8f8;
    min-height: 100vh;
    .p1{
        font-weight: 700;
        line-height: 40px;
    }
    .p2{
        font-size: 15px;
        margin-bottom: 20px;
        line-height: 26px;
        text-indent: 1rem;
    }
}
</style>
