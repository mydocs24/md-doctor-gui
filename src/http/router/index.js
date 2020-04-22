import Vue from 'vue'
import Router from 'vue-router'

import StatisticsComponent from '@/controllers/StatisticsComponent.vue'
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
  { path: '/accidents/:id', component: Accident, meta: {auth: true} },
  { path: '/profile', component: Profile, meta: {auth: true} },
  { path: '/statistics', component: StatisticsComponent, meta: {auth: true} },
  /*  { path: '/about', component: StatisticsComponent, meta: {auth: true} },
  { path: '/privacy', component: StatisticsComponent, meta: {auth: true} },
  { path: '/help', component: StatisticsComponent, meta: {auth: true} }, */
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
