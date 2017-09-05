/**
 * @author A.Zagovorichev <zagovorichev@gmail.com>
 * 9/5/2017.
 */

import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/controllers/Hello.vue'
import NotFoundComponent from '@/controllers/system/404.vue'
import AccessDeniedComponent from '@/controllers/system/403.vue'
import ServerErrorComponent from '@/controllers/system/502.vue'
import LoginComponent from '@/controllers/Login.vue'

// components
const Dashboard = resolve => {
  require.ensure(['@/controllers/Dashboard.vue'], () => {
    resolve(require('@/controllers/Dashboard.vue'))
  })
}

const Accident = resolve => {
  require.ensure(['@/controllers/Accident.vue'], () => {
    resolve(require('@/controllers/Accident.vue'))
  })
}

const Profile = resolve => {
  require.ensure(['@/controllers/Profile.vue'], () => {
    resolve(require('@/controllers/Profile.vue'))
  })
}

// routes
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

Vue.use(Router)

const routes = [
  // default component when page not found
  { path: '/', component: Dashboard, meta: {auth: true} },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    meta: {auth: false}
  },
  { path: '/doctor/accidents/:id', component: Accident, meta: {auth: true} },
  { path: '/doctor/profile', component: Profile, meta: {auth: true} },
  { path: '/component1', component: Foo }, // worked without authentication
  { path: '/component2', component: Bar, meta: {auth: true} },
  { path: '/hello', component: Hello },
  {
    path: '/404',
    name: 'error-404',
    component: NotFoundComponent
  }, {
    path: '/403',
    name: 'error-403',
    component: AccessDeniedComponent
  }, {
    path: '/502',
    name: 'error-502',
    component: ServerErrorComponent
  },
  { path: '*', name: 'no-route-404', component: NotFoundComponent }
]

export default new Router({
  mode: 'history',
  routes: routes,
  base: __dirname,
  hashbang: false
})
