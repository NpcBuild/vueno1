import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "./store";
import "./assets/css/common.css"
import './assets/css/global.css'//导入全局样式表
import request from "./axios";
Vue.prototype.$axios = request //全局使用

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//背景
// import VueParticles from "vue-particles";
// Vue.use(VueParticles);

// 引入新手引导
import VueIntro from 'vue-introjs';
import 'intro.js/introjs.css';
Vue.use(VueIntro);

// import {drag} from "@/utils/directives";
// Vue.use(drag)

// 引入antd
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
// import { Button } from "ant-design-vue";
// import 'ant-design-vue/lib/button/style/css'
// Vue.component(Button.name, Button)

//moment.js
import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用

Vue.use(ElementUI);

// 断点续传等
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

Vue.config.productionTip = false
import {getRequest,postRequest} from "./utils/request"
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

// require("./mock.js")
import dragBall from 'vue-drag-ball'
Vue.use(dragBall)
Vue.directive('drag',{
  bind(el,binding,vnode){
    console.log(el);
    console.log(binding);
    console.log(vnode);
  }
})


// 路由导航守卫控制访问权限
router.beforeEach(async (to, from, next) => {
  await store.dispatch('getTokenFromStorage');
  const token = store.state.token;
  if (to.meta.requireAuth) {
    if (!token && to.name != 'logins') {
      next({path: "/logins"})
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
