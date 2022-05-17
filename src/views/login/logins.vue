<template>
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
      <button>登录</button>
    </div>
  </div>
  <div class="con-box left">
    <h2>欢迎来到<span/>登录页</h2>
    <p>快来~~~~~~</p>
<!--    <img src="./src/assets/npcLogo.png" alt="">-->
    <p>已有帐号</p>
    <button id="login" onclick="toLogIn">去登录</button>
  </div>
  <div class="con-box right">
    <h2>欢迎来到<span/>登录页</h2>
    <p>快来~~~~~~</p>
    <!--    <img src="./src/assets/npcLogo.png" alt="">-->
    <p>没有帐号？</p>
    <button id="register" onclick="goToRegister">去注册</button>
  </div>
</div>
</template>

<script>
// let login = document.getElementById("login");
// let register = document.getElementById("register");
let form_box = document.getElementsByClassName("form_box")[0];
let register_box = document.getElementsByClassName("register-box")[0];
let login_box = document.getElementsByClassName("login-box")[0];


export default {
  name: "logins",
  methods: {
    goToRegister() {
      form_box.style.transform='translateX(80%)';
      login_box.classList.add('hidden');
      register_box.classList.remove('hidden');
    },
    toLogIn() {
      form_box.style.transform = 'translateX(0%)';
      register_box.classList.add('hidden');
      login_box.classList.remove('hidden');
    },
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
body{
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
</style>