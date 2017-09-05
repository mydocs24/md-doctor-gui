// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/http/router'
import i18n from '@/i18n'
import BootstrapVue from 'bootstrap-vue'
import VueEvents from 'vue-events'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// needed by auth
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
Vue.use(VueAxios, axios)

// needed by auth
Vue.router = router

require('@/http/auth')
require('./config/growlNotificator')

Vue.use(BootstrapVue)
Vue.use(VueEvents)

/* eslint-disable no-new */
/* window.vm = */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  i18n
})
