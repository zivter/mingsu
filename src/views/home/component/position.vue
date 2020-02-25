<template>
  <div class="position">
    <van-tree-select
      :items="allCategory"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav='handleNavClick'
      @click-item='handleItemClick'
    />
    <div class="overflow">
      <van-button type="default" round class="clearBtn" @click="onConfirm(1)">清空</van-button>
      <van-button type="danger" round class="saveBtn" @click="onConfirm">保存</van-button>
    </div>
  </div>
</template>

<script>
import { getAllCategory } from '@/api/categoryQuery'

export default {
  name: 'positon',
  props: {},
  data(){
    return{
      activeId: 1,
      activeIndex: 0,
      allCategory:[],
      positionId:null
    }
  },
  computed: {},
  filters:{},
  created(){
    this.getAllCategory()
  },
  methods:{
    /**获取全部地址分类 */
    getAllCategory(){
      getAllCategory().then((result) => {
        this.allCategory = result.result.items
        this.categoryFilter(this.allCategory)
      }).catch((err) => {
        this.$notify({type:'warning',message:err})
      });
    },
    /**递归 */
    categoryFilter(data) {
      data.forEach(element => {
        element.text = element.categoryName
        element.id = element.categoryId
        this.categoryFilter(element.children)
      });
    },
    onConfirm(type){
      var positionId = type == 1 ? null : this.positionId
      this.$emit('positionChange', positionId)
    },
    handleNavClick(val){
      this.positionId = val
    },
    handleItemClick(val){
      this.positionId = val.id
    }
  }
}
</script>

<style scoped lang='scss'>
.saveBtn{
  width: 60%;
  display: block;
  margin: 16px auto;
  float: left;
}
.clearBtn{
  float: left;
  width: 20%;
  display: block;
  margin: 16px 30px 16px 30px;
}
</style>
