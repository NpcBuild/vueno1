import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "./store";
import "./assets/css/common.css"
import axios from "axios";
Vue.prototype.$axios = axios //全局使用

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//背景
// import VueParticles from "vue-particles";
// Vue.use(VueParticles);

// 引入新手引导
import VueIntro from 'vue-introjs';
import 'intro.js/introjs.css';
Vue.use(VueIntro);

Vue.use(ElementUI);

Vue.config.productionTip = false
import {getRequest,postRequest} from "./utils/request"
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

require("./mock.js")

router.beforeEach((to,from,next) => {
  store.commit('GET_TOKEN')
  // eslint-disable-next-line no-debugger
  debugger
  const token = store.state.token
  if(to.meta.requireAuth) {
    if (!token && to.name!='Login') {
      next({ path: "/login" })
    } else {
      next()
    }
  }else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
