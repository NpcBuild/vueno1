<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>欢迎登陆</h2>
      <el-image :src="require('../../assets/npcLogo.png')" style="height: 35px;width: 90px;"></el-image>
      <p>公众号：****************</p>
    </el-col>
    <el-col :span="1"> <el-divider direction="vertical"></el-divider> </el-col>
    <el-col :xl="6" :lg="7">
      <el-form :model="loginForm" :rules="rules" status-icon="rules" ref="loginForm" label-width="100px" class="demo-rule">
        <el-form-item label="账号" prop="user" style="width: 380px;">
          <el-input type="text" v-model="loginForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="width: 380px;">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px;">
          <el-input type="text" v-model="loginForm.code" autocomplete="off" style="width: 172px; float: left;"></el-input>
          <el-image src="" class="captchaImage"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" size="small">登录</el-button>
          <el-button @click="resetForm('loginForm')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div v-html="modss"></div>
  </el-row>

</template>

<script>
// import axios from "axios";
// axios.defaults.withCredentials = false;

export default {
  name: "Login",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value ==='') {
        callback(new Error('请输入账户'));
      }else {
        if (this.loginForm.pass !==''){
          this.$refs.loginForm.validateField('pass');
        }
        callback();
      }
    };
    var validatePass2 = (rule,value,callback) => {
      if (value ===''){
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };
    return {
      loginForm: {
        user:'',
        pass:'',
        code:'',
      },
      rules: {
        user: [
          {required:true, message:'请输入账号',trigger: 'blur'},
          {validator: validatePass,trigger: 'blur'}
        ],
        pass: [
          {required:true, message:'请输入密码',trigger: 'blur'},
          {validator: validatePass2,trigger: 'blur'}
        ],
        code: [
          {required:true, message:'请输入验证码',trigger: 'blur'},
          {min:4,max:4,message: '长度为4个字符',trigger: 'blur'}
        ],
      },
      isLogin:false,
      modss:'ss'
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid,invalidFields)=>{
        console.log("valid:"+valid+invalidFields);
        if (valid) {
          let _this = this;
          //判断axios发送用户名称，判断
          _this.$axios.post('http://localhost:8082/logins', {
            account: _this.loginForm.user,
            password: _this.loginForm.pass,
          }, {
            headers: {
              // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'content-type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
              'X-Powered-By':' 3.2.1',
              'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
            }
          }).then(res=>{
            // eslint-disable-next-line no-debugger
            debugger
            if (res.data.code == "0"){
              _this.$message.success(res.data);
              //登录成功后，token保存到客户端的sessionStorage中
              //项目中其他的API接口，必须在登录之后才能访问，记录token就是为了当我们访问有权限的接口时可以提供身份认证信息
              //token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
              window.sessionStorage.setItem("token",res.data.code);
              //通过编程式导航跳转到首页，路由地址是/home
              this.$router.push("/home");
            }else {
              _this.$message.error(res.data);
            }
            console.log(loginForm);
          })
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.$axios.get('http://localhost:8082/login', {
      }, {
        headers: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'content-type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
          'X-Powered-By':' 3.2.1',
          'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
        }
      }).then(res=>{
        // eslint-disable-next-line no-debugger
        debugger
        this.modss = res.data
        console.log(res);
        console.log(formName);
      })
    },
    getCaptcha() {
      this.$axios.post('/captcha').then(res => {
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
  }
}

</script>

<style scoped>
  .el-row {
    /*background-color: #fafafa;*/
    background-color: #969696;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 15%;
    margin-left: 20%;
  }
  .el-divider {
    height: 200px;
  }
  .captchaImage {
    float: left;
    margin-left: 8px;
    border-radius: 4px;
  }
</style>