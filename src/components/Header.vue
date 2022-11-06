<template>
  <div class="main">
<!--    <div id="step_1">-->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" @click="drawer = true">
        <el-avatar size="large" src="https://bpic.588ku.com/ad_diversion/19/08/22/915abbf3e26f11efc0c7e121b3c8f996.png"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login">登录</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="about">关于</el-dropdown-item>
        <el-dropdown-item command="logOut" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-drawer
        title="我的账号"
        :visible.sync="drawer"
        :direction="direction"
    >
      <span @click="mess">更改头像</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    }
  },
  mounted() {
    console.debug('我进来了')
    // 调用，要等所有加载完毕以后在触发,引导提示
    // this.setGuide()
  },
  methods: {
    getUserInfo() {
      this.$axios.get().then(res => {
        this.userInfo = res.data.data
      })
    },
    handleCommand(command) {
      this.$message('点击了 ' + command);
      if (command=="login") {
        this.$router.push("/login");
      } else if (command=="b") {
        this.$router.push("/home");
      } else if (command=="about") {
        this.$router.push("/about");
      } else if (command=="logOut") {
        // eslint-disable-next-line no-debugger
        debugger
        this.$store.commit('CLEAR_TOKEN');
        this.$router.push("/logins");
      }
    },
    // setGuide() {
    //   // 通过id或者class绑定步骤，也可以直接定死在div上面
    //   // let steps = [
    //   //   {
    //   //     element: '.step_1',
    //   //     intro: '步骤1：对应class为.step_1的元素进行选择提示!  ',
    //   //     position: 'right',
    //   //   },
    //   //   {
    //   //     element: '#step_2',
    //   //     intro: '步骤2：对应Id为#step_2的元素进行选择提示!  ',
    //   //     position: 'left',
    //   //   },
    //   // ]      // let steps = [
    //   //   {
    //   //     element: '.step_1',
    //   //     intro: '步骤1：对应class为.step_1的元素进行选择提示!  ',
    //   //     position: 'right',
    //   //   },
    //   //   {
    //   //     element: '#step_2',
    //   //     intro: '步骤2：对应Id为#step_2的元素进行选择提示!  ',
    //   //     position: 'left',
    //   //   },
    //   // ]
    //   this.$intro().setOptions({
    //     prevLabel: "上一步",
    //     nextLabel: "下一步",
    //     skipLabel: "跳过",
    //     doneLabel: "完成"
    //   }).oncomplete(()=> {
    //     //点击结束按钮后执行的事件
    //   }).onexit(()=> {
    //     //点击跳过按钮后执行的事件
    //   }).start()
    //   //引入intro.js
    //   // this.$intro().setOptions({
    //   //       // 我给看的效果图是英文的（默认英文），这里是更换成中文
    //   //       prevLabel: '上一步',
    //   //       nextLabel: '下一步',
    //   //       skipLabel: '跳过',
    //   //       doneLabel: '完成',
    //   //       // steps步骤，可以写个工具类保存起来
    //   //       steps: steps,
    //   //     })
    //   //     .oncomplete(() => {
    //   //       // 需要注意的是，这里用了箭头函数
    //   //       // 点击结束按钮后执行的事件
    //   //     })
    //   //     .onexit(() => {
    //   //       // 点击跳过按钮后执行的事件
    //   //     })
    //   //     .onbeforeexit(() => {
    //   //       // 确认完毕之后执行的事件
    //   //       // return confirm('Are you sure?')
    //   //     }).start()
    // },
    mess() {
      this.$message.success('ww')
    }
  }
}
</script>

<style scoped>
  /*.header {*/
  /*  position: relative;*/
  /*  width: 100%;*/
  /*  height: 0;*/
  /*  !*padding-top: 33.5%;*!*/
  /*  padding-top: 100%;*/
  /*  color: #fff;*/
  /*  font-size: 0.28rem;*/
  /*  text-align: center;*/
  /*  background: url("../assets/test.jpg") no-repeat;*/
  /*  background-size: cover;*/
  /*}*/
  .main {
    background-color: #42b983;
  }
</style>