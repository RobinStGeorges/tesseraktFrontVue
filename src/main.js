import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
import NavBar from '@/components/NavBar'
Vue.use(VueAxios)
Vue.prototype.$userMail = ''
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
new Vue({
  el: '#nav_bar',
  router,
  render: h => h(NavBar)
})
