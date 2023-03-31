<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div>
        <img src="@/assets/images/Leah.gif" style="height: 180px;width: auto">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button></el-header><!--头部 -->
    <el-container>
      <!--侧边栏-->
      <el-aside class="el-aside" width="200px">
        <!--侧边栏菜单区-->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单栏 -->
          <!--1、:是vue-bind:的一种简写,这是为了能够识别item这个data中的变量和加号；:key也是一样的原理
              2、item.id+''是为了把数字转换成字符串（因为index的值默认是字符串），否则会报错:Invalid prop -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单栏的模板，i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单栏 -->
            <el-menu-item :index="subitem.id+''" v-for="subitem in item.children" :key="subitem.id"> <!-- 1、注意是item.children而不是item哦 -->
              <i class="el-icon-location"></i>
              <span slot="title">{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="el-main">Main</el-main><!--右侧主界面 -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "admin",
  data(){//这是vue中data对象的es6写法。data中存放变量有三种写法
    return {
      //左侧菜单栏数据
      menulist: []
    }
  },
  created() {
    this.getMenuList();
  },
  methods:{
    loginOut(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单栏
    async getMenuList() {
      const {data: res} = await this.$http.get('menus');//menus是后端api的请求路径
      // console.log(res);
      if(res.meta.status !== 200) this.$message.error("错误代码"+res.meta.status+":"+res.meta.msg);
      this.menulist=res.data;
      console.log(this.menulist);
      this.$message.success("获取菜单信息成功");

    }
  }
}
</script>

<style scoped>

</style>