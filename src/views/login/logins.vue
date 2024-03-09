<template>
  <div class="main">
    <div class="container">
      <div class="form-box">
        <!-- 注册 -->
        <div class="register-box hidden">
          <h1>注册</h1>
          <input type="text" placeholder="用户名" v-model="registForm.user"/>
          <input type="phone" placeholder="手机号" v-model="registForm.phone"/>
          <input type="password" placeholder="密码" v-model="registForm.pass"/>
          <input type="password" placeholder="确认密码" v-model="registForm.confirmPass"/>
          <button @click="regist('registForm')">注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box">
          <h1>登录</h1>
          <input type="text" placeholder="用户名" v-model="loginForm.user"/>
          <input type="password" placeholder="密码" v-model="loginForm.pass" @keyup.enter="submitForm('loginForm')"/>
          <button @click="submitForm('loginForm')">登录</button>
        </div>
      </div>
      <div class="con-box left" slot="placeholder">
        <h2>欢迎来到注册页</h2>
        <p>快来~~~~~~</p>
        <img src="@/assets/images/IMG_1932.png" alt="">
<!--        <div class="block">-->
<!--          <span class="demonstration">自定义</span>-->
<!--          <el-image :src="src">-->
<!--            <div slot="placeholder" class="image-slot">-->
<!--              加载中<span class="dot">...</span>-->
<!--            </div>-->
<!--          </el-image>-->
<!--        </div>-->
        <p style="margin-top: 15px">已有帐号</p>
        <button id="login" @click="toLogIn">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>NPC</span>登录页</h2>
        <p>扫码登录</p>
<!--        <img src="https://qcloudtest-1258517105.cos.ap-guangzhou.myqcloud.com/IMG_1932.PNG" alt="">-->
        <img :src="imgBase" alt="" @click="qrCode">
<!--        <div class="qrCodeImg-box" id="qrImgDiv"></div>-->
        <div class="social-media">
          <a href="#" class="social-icon">
            <i class="el-icon-eleme"></i>
          </a>
          <a href="http://192.168.1.5:1314/authorize" class="social-icon">
            <i class="el-icon-c-scale-to-original"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="el-icon-share"></i>
          </a>
        </div>
        <p style="margin-top: 15px">没有帐号？</p>
        <button id="register" @click="goToRegister">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/store/sessionStorage";

export default {
  name: "logins",
  data () {
    return {
      loginForm: {
        user:'',
        pass:'',
      },
      registForm: {
        user:'',
        phone:'',
        pass:'',
        confirmPass:'',
      },
      imgBase: '', //存图片字节流
      s: null,
    }
  },
  mounted() {
    this.qrCode();
  },
  destroyed () {
    this.ws.close() // 页面销毁后断开websocket连接
  },
  methods: {
    qrCode() {
      this.getRequest('/qrCode',{userId: 1}).then(res => {
        console.log(res)
        this.imgBase = 'data:image/jpeg;base64,' + res.data.img;
        this.initWebSocket(res.data.uuid)
      })
    },
    initWebSocket(uuid) {
      console.log('初始化WebSocket链接中……',uuid)
      var that = this
      if (!window.WebSocket) {
        // 不支持的情况
        window.WebSocket = window.MozWebSocket;
      }
      if (window.WebSocket) {
        this.ws = new WebSocket("ws://127.0.0.1:12345/socket?uuid="+uuid);
        this.ws.onopen = function (event) {
          console.log(event);
          console.log('WebSocket链接成功');
        };
        this.ws.onmessage = function (event) {
          let data = event.data;
          console.log(event.data);
          try {
            data = JSON.parse(event.data)
          } catch (e) {
            console.log(e)
          }
          if (data) {
            that.loginResult(data)
            console.log('登录成功')
            this.ws.close()
          } else {
            // 如果过期了，关闭链接、重置链接、刷新二维码
            this.ws.close()
            this.qrCode()
          }
        };
        this.ws.onerror = function (event) {
          console.log(event)
          console.log('WebSocket链接失败')
        };
        this.ws.onclose = function (event) {
          console.log(event);
          console.log('WebSocket链接关闭');
        };
      } else {
        alert("您的浏览器不支持WebSocket协议！");
      }
    },
    goToRegister() {
      let form_box = document.getElementsByClassName("form-box")[0];
      let register_box = document.getElementsByClassName("register-box")[0];
      let login_box = document.getElementsByClassName("login-box")[0];
      form_box.style.transform='translateX(80%)';
      login_box.classList.add('hidden');
      register_box.classList.remove('hidden');
    },
    toLogIn() {
      let form_box = document.getElementsByClassName("form-box")[0];
      let register_box = document.getElementsByClassName("register-box")[0];
      let login_box = document.getElementsByClassName("login-box")[0];
      form_box.style.transform = 'translateX(0%)';
      register_box.classList.add('hidden');
      login_box.classList.remove('hidden');
    },
    submitForm() {
      // this.$refs[loginForm].validate(async (valid,invalidFields)=>{
      //   console.log("valid:"+valid+invalidFields);
      //   if (valid) {
      let _this = this;
          this.postRequest('/login', {
            account: _this.loginForm.user,
            userPwd: _this.loginForm.pass,
          }).then(res => {
            this.loginResult(res)
          })
        // }
      // })
    },
    loginResult(res) {
      if (res.code == "200"){
        this.$message.success(res.message);
        //登录成功后，token保存到客户端的sessionStorage中
        //项目中其他的API接口，必须在登录之后才能访问，记录token就是为了当我们访问有权限的接口时可以提供身份认证信息
        //token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        db.save("token",res.data.accessToken);
        db.save("refresh_token",res.data.refreshToken);

        // this.$store.commit('SET_TOKEN',res.data)

        this.$store.commit('SET_TOKEN',res.data.accessToken)
        this.$store.commit('SET_REFRESH_TOKEN',res.data.refreshToken)

        //
        // const jwt = res.headers['authorization']
        // this.$store.commit('SET_TOKEN',jwt)

        //通过编程式导航跳转到首页，路由地址是/home
        this.$router.push("/home");
      }else {
        this.$message.error(res.message);
      }
    },
    regist(registForm) {
      let _this = this;
      this.postRequest('/regist', {
        account: _this.registForm.user,
        userPwd: _this.registForm.pass,
        phone: _this.registForm.phone,
      }).then(res => {
        // eslint-disable-next-line no-debugger
        debugger
        if (res.code == "0"){
          _this.$message.success(res.message);
        }else _this.$message.error(res.message)
      })
      console.log(registForm);
    },
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.main{
  /*百分之百的窗口高度*/
  height: 100vh;
  /*弹性布局*/
  display: flex;
  align-items: center;
  justify-content: center;
  /*渐变背景*/
  background: linear-gradient(200deg,#f3e7e9,#e3eeff);
}
.container{
  background-color: #fff;
  width: 650px;
  height: 415px;
  /*阴影*/
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
  /*相对定位*/
  position: relative;
}
.form-box{
  /*绝对定位*/
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #d3dce6;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  /*弹性布局*/
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  /*动画过渡 加速之后 减速*/
  transition: 0.5s ease-in-out;
}
.register-box,.login-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.hidden{
  display: none;
  transition: 0.5s;
}
h1{
  text-align: center;
  margin-bottom: 25px;
  color: #fff;
  /*字间距*/
  letter-spacing: 5px;
  font-size: 18px;
}
input{
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /*下边框样式*/
  border-bottom: 1px solid rgba(255,255,255,0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  /*字间距*/
  letter-spacing: 2px;
}
input::placeholder{
  color: #fff;
}
input:focus{
  color: #a262ad;
  outline: none;
  border-bottom: 1px solid #a262ad80;
  transition: 0.5s;
}
input:focus::placeholder{
  opacity: 0;
}
.form-box button{
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #d3dce6;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.form-box button:hover{
  background-color: #d3dce6;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}
.con-box{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  /*绝对定位*/
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.con-box.left{
  left: -2%;
}
.con-box.right{
  right: -2%;
}
.con-box h2{
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}
.con-box p{
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}
.con-box span{
  color: #d3b7d8;
}
.con-box img{
  width: 150px;
  height: 150px;
  /*透明度*/
  opacity: 0.9;
  /*margin: 40px 0;*/
  display: block;
  margin: 0 auto;
}
.con-box button{
  margin-top: 3%;
  background-color: #fff;
  color: #a262ad;
  border: 1px solid #d3b7d8;
  padding: 6px 10px;
  letter-spacing: 1px;
  outline: none;
  /*position: absolute;*/
  width: 20%;
  display: block;
  margin: 0 auto;
  /*鼠标放上变小手*/
  cursor: pointer;
}
.con-box button:hover{
  background-color: #a262ad;
  color: #f6f6f6;
}

.social-media{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.social-icon{
  height: 30px;
  width: 30px;
  border: 1px solid #333;
  margin: 0 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 0.2rem;
  border-radius: 50%;
  transition: 0.3s;
}
.social-icon:hover{
  color: #4481eb;
  border-color: #4481eb;
}
</style>