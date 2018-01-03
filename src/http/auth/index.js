/**
 * @author A.Zagovorichev <zagovorichev@gmail.com>
 * 9/5/2017.
 */
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAuth, {
  token: [{name: 'token', authType: 'bearer', foundIn: 'response'}],
  auth: require('./bearer'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'doctor',
  loginData: {url: 'authenticate', redirect: '/'},
  logoutData: {url: 'logout', redirect: '/login'},
  fetchData: {url: 'user', method: 'GET', enabled: true},
  authRedirect: {path: '/login'},
  // tokenExpired: () => false, // turned off data refreshing
  refreshData: {
    url: 'token',
    method: 'GET',
    enabled: true,
    interval: 14,
    error: function (err) {
      if (err.response.status === 401 || err.response.status === 402 || err.response.status === 403) {
        // drop token if expired for fresh
        localStorage.clear()
        Vue.router.push({path: '/login'})
      }
    }}
})
