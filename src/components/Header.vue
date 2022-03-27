<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
<!--  <div class="header">-->

<!--  </div>-->
</template>

<script>
export default {

}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    text-align: center;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .header {
    position: relative;
    width: 100%;
    height: 0;
    /*padding-top: 33.5%;*/
    padding-top: 100%;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    background: url("../assets/test.jpg") no-repeat;
    background-size: cover;
  }
</style>