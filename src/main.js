import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
Vue.use(VueAxios)
Vue.prototype.$userMail = 'test@test.com'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
