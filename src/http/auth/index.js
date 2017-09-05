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
  tokenExpired: () => false,
  refreshData: {
    url: 'token',
    method: 'GET',
    enabled: true,
    interval: 30,
    error: function (err) {
      if (err.response.status === 401) {
        // drop token if expired for fresh
        // Vue.router.push({path: '/login'})
        console.log('Token could not be updated because current token is failed')
      }
    }}
})
