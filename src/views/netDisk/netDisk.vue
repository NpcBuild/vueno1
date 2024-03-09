<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside><Left :selectedMenuIndex="selectedMenuIndex" @menuClick="handleMenuClick"></Left></el-aside>
      <el-main>
        <div v-if="selectedMenuIndex === '1'">
          <Right></Right>
        </div>
        <div v-else-if="selectedMenuIndex === '2'">
          <picture-list></picture-list>
        </div>
        <div v-else-if="selectedMenuIndex === '3'"></div>
        <div v-else-if="selectedMenuIndex === '4'"></div>
        <div v-else-if="selectedMenuIndex === '5'"></div>
        <div v-else-if="selectedMenuIndex === '6'"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import  Header from '../../components/Header'
import  Right from './Right'
import  Left from './Left'
import PictureList from "./picture-list.vue";
export default {
  name: "netDisk",
  data(){
    return{
      selectedMenuIndex: '1' // 初始选中的菜单索引
    }
  },
  components:{
    PictureList,
    Header,
    Right,
    Left
  },
  created(){
    // if(localStorage.getItem('uid')==''||localStorage.getItem('uid')==undefined){
    //   this.$confirm('您还未登陆/或者登陆已过期', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$router.push({path: '/'})
    //   }).catch(() => {
    //     this.$router.push({path: '/'})
    //   });
    // }

  },
  methods:{
    handleMenuClick(index) {
      this.selectedMenuIndex = index; // 更新选中的菜单索引
    }
  }
}
</script>

<style scoped>
.el-header{
  width: 100%;
  box-shadow:  0 2px 6px 0 rgba(0,0,0,.05);

}
.el-container{
  height: 100%;

}

.el-aside{
  background-color:  #f7f7f7;
  max-width: 194px;

}
.el-main{
  /*height: calc(100% - 62px);*/
  max-width: calc(100% - 194px);
}
</style>