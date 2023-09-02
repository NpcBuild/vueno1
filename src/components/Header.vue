<template>
  <div class="main">
<!--    <div id="step_1">-->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" @click="drawer = true">
        <el-avatar size="large" src="https://bpic.588ku.com/ad_diversion/19/08/22/915abbf3e26f11efc0c7e121b3c8f996.png"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login">登录</el-dropdown-item>
        <el-dropdown-item command="chat">聊天</el-dropdown-item>
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
    <span>系统消息：</span>
    <el-badge :value="messageCount" class="notification-badge">
      <el-icon name="bell" class="notification-icon"></el-icon>
    </el-badge>
  </div>
</template>

<script>
// let source = null;
// let userId = 1314
// if (window.EventSource) {
//   // 建立连接
//   source = new EventSource('http://localhost:1314/sse/sub/' + userId);
//   console.log(userId,"userId")
//   // setMessageInnerHTML("连接用户=" + userId);
//   /**
//    * 连接一旦建立，就会触发open事件
//    * 另一种写法：source.onopen = function (event) {}
//    */
//   source.addEventListener('open', function (e) {
//     console.log("建立连接。。。",e)
//     // setMessageInnerHTML("建立连接。。。");
//   }, false);
//   /**
//    * 客户端收到服务器发来的数据
//    * 另一种写法：source.onmessage = function (event) {}
//    */
//   source.addEventListener('message', function (e) {
//     console.log(e.data,"e.data")
//     // setMessageInnerHTML(e.data);
//   });
// } else {
//   // setMessageInnerHTML("你的浏览器不支持SSE");
// }
import db from "@/store/sessionStorage";

export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      messageCount: 0, // 消息数
    }
  },
  mounted() {
    console.debug('我进来了')
    // 调用，要等所有加载完毕以后在触发,引导提示
    // this.setGuide()


    // 获取消息数
    // 创建 EventSource 对象连接到 /messages 路由
    const eventSource = new EventSource('http://localhost:1314/messages');
    // 当接收到消息时更新界面上的消息计数器
    eventSource.addEventListener('message', event => {
      console.log("see",event)
      this.messageCount++;
    });

  },
  methods: {
    getUserInfo() {
      this.$axios.get().then(res => {
        this.userInfo = res.data.data
      })
    },
    handleCommand(command) {
      if (command=="login") {
        this.$router.push("/login");
      } else if (command=="chat") {
        this.$router.push("/chat");
      } else if (command=="about") {
        this.$router.push("/about");
      } else if (command=="logOut") {
        this.$store.commit('CLEAR_TOKEN');
        db.remove("token")
        db.remove("refresh_token")
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

  .notification-badge .el-badge__content {
    background-color: red;
    color: #fff;
    float: right;
    margin-right: 20px;
  }

  .notification-icon {
    font-size: 24px;
  }
</style>