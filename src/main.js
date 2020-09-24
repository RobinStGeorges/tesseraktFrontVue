import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
import NavBar from '@/components/NavBar'
import moment from 'moment'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.use(VueAxios)
Vue.prototype.$userMail = ''
Vue.prototype.$ipAdresse = '192.168.0.24'
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

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
