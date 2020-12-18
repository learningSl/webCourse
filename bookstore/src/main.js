import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './style.css'
import {save, show} from './storge'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$save = save
Vue.prototype.$show = show
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
