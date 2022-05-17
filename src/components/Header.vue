<template>
  <div>
    <div id="step_1">
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
<!--        下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <el-avatar size="large" src="https://bpic.588ku.com/ad_diversion/19/08/22/915abbf3e26f11efc0c7e121b3c8f996.png"></el-avatar>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">登录</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
          <el-dropdown-item command="about">关于</el-dropdown-item>
          <el-dropdown-item command="logOut" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div id="step_2">

    <el-carousel indicator-position="outside" type="card">
      <el-carousel-item v-for="url in urls" :key="url">
        <el-image
            style="width: 100%; height: 100%"
            :src=url
            fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
<!--  <div class="header">-->

<!--  </div>-->
</template>

<script>
export default {
  data() {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  mounted() {
    console.debug('我进来了')
    // 调用，要等所有加载完毕以后在触发,引导提示
    this.setGuide()
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
        this.$router.push("/login");
      }
    },
    setGuide() {
      // 通过id或者class绑定步骤，也可以直接定死在div上面
      // let steps = [
      //   {
      //     element: '.step_1',
      //     intro: '步骤1：对应class为.step_1的元素进行选择提示!  ',
      //     position: 'right',
      //   },
      //   {
      //     element: '#step_2',
      //     intro: '步骤2：对应Id为#step_2的元素进行选择提示!  ',
      //     position: 'left',
      //   },
      // ]      // let steps = [
      //   {
      //     element: '.step_1',
      //     intro: '步骤1：对应class为.step_1的元素进行选择提示!  ',
      //     position: 'right',
      //   },
      //   {
      //     element: '#step_2',
      //     intro: '步骤2：对应Id为#step_2的元素进行选择提示!  ',
      //     position: 'left',
      //   },
      // ]
      this.$intro().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "完成"
      }).oncomplete(()=> {
        //点击结束按钮后执行的事件
      }).onexit(()=> {
        //点击跳过按钮后执行的事件
      }).start()
      //引入intro.js
      // this.$intro().setOptions({
      //       // 我给看的效果图是英文的（默认英文），这里是更换成中文
      //       prevLabel: '上一步',
      //       nextLabel: '下一步',
      //       skipLabel: '跳过',
      //       doneLabel: '完成',
      //       // steps步骤，可以写个工具类保存起来
      //       steps: steps,
      //     })
      //     .oncomplete(() => {
      //       // 需要注意的是，这里用了箭头函数
      //       // 点击结束按钮后执行的事件
      //     })
      //     .onexit(() => {
      //       // 点击跳过按钮后执行的事件
      //     })
      //     .onbeforeexit(() => {
      //       // 确认完毕之后执行的事件
      //       // return confirm('Are you sure?')
      //     }).start()
    }
  }
}
</script>

<style scoped>
  /*.el-carousel__item h3 {*/
  /*  color: #475669;*/
  /*  font-size: 18px;*/
  /*  opacity: 0.75;*/
  /*  line-height: 300px;*/
  /*  text-align: center;*/
  /*  margin: 0;*/
  /*}*/

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