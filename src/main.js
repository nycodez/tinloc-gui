import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

axios.default.baseURL = 'http://127.0.0.1:3000/api'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
