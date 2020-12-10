import "./assets/css/style.scss";
import Vue from "vue";
import App from "./App.vue";
import cookies from "vue-cookies";
import router from "./router";
import store from "./store";

Vue.use(cookies);
Vue.config.productionTip = false;

new Vue({
  cookies,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
