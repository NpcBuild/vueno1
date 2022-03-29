import Vue from 'vue'
import App from './App.vue'
// import Header from "@/components/Header";
// import Home from "@/views/Home";
import router from "@/router";
import store from "./store";
import "./assets/css/common.css"
// import axios from "./axios";
import axios from "axios";
Vue.prototype.$axios = axios //全局使用

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueParticles from "vue-particles";

Vue.use(ElementUI);
Vue.use(VueParticles);

Vue.config.productionTip = false

require("./mock.js")

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
