import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import './plugins/axios'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.filter('dateFormat', function (value) {
  let result = "00:00"
  let m = parseInt(value / 60) > 10 ? parseInt(value / 60) : "0" + parseInt(value / 60)
  let s = parseInt(value % 60) > 10 ? parseInt(value % 60) : "0" + parseInt(value % 60)
  result = m + ':' + s
  return result;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')