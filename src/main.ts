import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const thisScript = document.currentScript;
console.log(thisScript);
new Vue({
  render: (h) => h(App),
  data() {
    return { currentScript: thisScript };
  },
}).$mount("#app");
