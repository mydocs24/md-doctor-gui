/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2017 (original work) MedCenter24.com;
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
