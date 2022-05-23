<template>
  <div class="main">
    <div class="container">
      <div class="form-box">
        <!-- 注册 -->
        <div class="register-box hidden">
          <h1>注册</h1>
          <input type="text" placeholder="用户名"/>
          <input type="phone" placeholder="手机号"/>
          <input type="password" placeholder="密码"/>
          <input type="password" placeholder="确认密码"/>
          <button>注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box">
          <h1>登录</h1>
          <input type="text" placeholder="用户名"/>
          <input type="password" placeholder="密码"/>
          <button @click="submitForm('loginForm')">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到注册页</h2>
        <p>快来~~~~~~</p>
        <img src="" alt="">
        <p>已有帐号</p>
        <button id="login" @click="toLogIn">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>NPC</span>登录页</h2>
        <p>快来~~~~~~</p>
        <img src="https://qcloudtest-1258517105.cos.ap-guangzhou.myqcloud.com/IMG_1932.PNG" alt="">
        <div class="social-media">
          <a href="#" class="social-icon">
            <i class="el-icon-eleme"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="el-icon-loading"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-google"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="el-icon-share"></i>
          </a>
        </div>
        <p>没有帐号？</p>
        <button id="register" @click="goToRegister">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "logins",
  data () {
    return {
      loginForm: {
        user:'yf',
        pass:'123',
      },
    }
  },
  methods: {
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
    submitForm(loginForm) {
      // this.$refs[loginForm].validate((valid,invalidFields)=>{
      //   console.log("valid:"+valid+invalidFields);
      //   if (valid) {
          let _this = this;
          this.postRequest('/logins', {
            account: _this.loginForm.user,
            password: _this.loginForm.pass,
          }, {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
            'X-Powered-By':' 3.2.1',
            'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
          }).then(res => {

            // eslint-disable-next-line no-debugger
            debugger
            if (res.code == "0"){
              _this.$message.success(res.message);
              //登录成功后，token保存到客户端的sessionStorage中
              //项目中其他的API接口，必须在登录之后才能访问，记录token就是为了当我们访问有权限的接口时可以提供身份认证信息
              //token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
              window.sessionStorage.setItem("token",res.code);

              this.$store.commit('SET_TOKEN',res.code)

              //
              // const jwt = res.headers['authorization']
              // this.$store.commit('SET_TOKEN',jwt)

              //通过编程式导航跳转到首页，路由地址是/home
              this.$router.push("/home");
            }else {
              _this.$message.error(res.message);
            }
            console.log(loginForm);
          })
        // }
      // })
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
</style>