// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import VueEvents from 'vue-events'
import App from './App.vue'
import Hello from './controllers/Hello.vue'
import NotFoundComponent from './controllers/system/404.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

require('./config/growlNotificator')

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueEvents)

// components
const Dashboard = resolve => {
  require.ensure(['./controllers/Dashboard.vue'], () => {
    resolve(require('./controllers/Dashboard.vue'))
  })
}

const Accident = resolve => {
  require.ensure(['./controllers/Accident.vue'], () => {
    resolve(require('./controllers/Accident.vue'))
  })
}

const Profile = resolve => {
  require.ensure(['./controllers/Profile.vue'], () => {
    resolve(require('./controllers/Profile.vue'))
  })
}

// routes
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

const routes = [
  // default component when page not found
  { path: '/', component: Dashboard, meta: {auth: true} },
  {
    path: '/login',
    name: 'login',
    component: require('./controllers/Login.vue'),
    meta: {auth: false}
  },
  { path: '/doctor/accidents/:id', component: Accident, meta: {auth: true} },
  { path: '/doctor/profile', component: Profile, meta: {auth: true} },
  { path: '/component1', component: Foo, meta: {auth: true} },
  { path: '/component2', component: Bar, meta: {auth: true} },
  { path: '/hello', component: Hello, meta: {auth: true} },
  {
    path: '/404',
    name: 'error-404',
    component: NotFoundComponent
  }, {
    path: '/403',
    name: 'error-403',
    component: require('./controllers/system/403.vue')
  }, {
    path: '/502',
    name: 'error-502',
    component: require('./controllers/system/502.vue')
  },
  { path: '*', name: 'no-route-404', component: NotFoundComponent }
]

Vue.router = new VueRouter({
  mode: 'history',
  routes: routes,
  base: __dirname,
  hashbang: false
})

// lang
Vue.use(VueI18n)
// ready translated locales
const messages = {
  en: {
    'Accident saved': 'Accident saved',
    'Success': 'Success',
    'Select Services': 'Select Services',
    'Select Surveys': 'Select Surveys',
    'Can\'t create diagnostic': 'Can\'t create diagnostic',
    'Can\'t save accident': 'Can\'t save accident',
    'API Error': 'API Error',
    'Select Diagnostics': 'Select Diagnostics',
    'Diagnostics': 'Diagnostics',
    'Diagnostic': 'Diagnostic',
    'Add': 'Add',
    'New': 'New',
    'Choose': 'Choose',
    'Symptoms': 'Symptoms',
    'Logout': 'Logout',
    'Medical Board Number': 'Medical Board Number',
    'MBN': 'MBN',
    'MeDoctor': 'MeDoctor',
    'Log In': 'Log In',
    'Forgot Password': 'Forgot Password',
    'Login Failed': 'Login Failed',
    'Failed to authenticate': 'Failed to authenticate',
    message: {
      hello: 'hello world',
      open: 'Open'
    },
    'case': {
      status: {
        closed: 'Closed',
        'signed': 'Signed',
        sent: 'Sent',
        'new': 'New',
        processing: 'In Progress'
      }
    },
    'Date': 'Date',
    'Referral Num': 'Referral Num',
    'city': 'city',
    'Status': 'Status',
    'Total': 'Total',
    'Copy': 'Copy',
    'Sign': 'Sign',
    'Send': 'Send',
    'Show filters': 'Show filters',
    'Hide filters': 'Hide filters',
    'My Cases': 'My Cases',
    'Close': 'Close',
    'Loading...': 'Loading...',
    'First Appointment': 'First Appointment',
    'Reiterative Appointment': 'Reiterative Appointment',
    'About': 'About',
    'Edit': 'Edit',
    'City': 'City',
    'Reject': 'Reject',
    'Accept': 'Accept',
    'Decline': 'Decline',
    'Open': 'Open',
    'Referral Number': 'Referral Number',
    'Phone': 'Phone',
    'Address': 'Address',
    'Commentary': 'Commentary',
    'Confirmation': 'Confirmation',
    'You\'ll sign selected cases': 'You\'ll sign selected cases',
    'You\'ll send selected cases': 'You\'ll send selected cases',
    'Select services': 'Select services',
    'Add new service': 'Add new service',
    'Case type': 'Case type',
    'Survey': 'Survey',
    'Add survey': 'Add survey',
    'Diagnose': 'Diagnose',
    'Additional investigation': 'Additional investigation',
    'Services': 'Services',
    'Service': 'Service',
    'Description': 'Description',
    'Delete': 'Delete',
    'New service': 'New service',
    'Title': 'Title',
    'Service title': 'Service title',
    'Service description': 'Service description',
    'Price': 'Price',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'All fields should be filled': 'All fields should be filled',
    'Request Error': 'Request Error',
    'Reject Reason': 'Reject Reason',
    'Reject Case': 'Reject Case',
    'MyDoctors24.com': 'MyDoctors24.com',
    'root_url': 'https://mydoctors24.com',
    'Surveys': 'Surveys',
    'Select surveys': 'Select surveys',
    'Add new survey': 'Add new survey',
    'New Survey': 'New Survey',
    'Survey title': 'Survey title',
    'Survey description': 'Survey description',
    'Patient City': 'Patient City',
    'Reason of treatment': 'Reason of treatment',
    'Patient Address': 'Patient Address',
    'Patient Name': 'Patient Name',
    'Name': 'Name',
    'Edit patient data': 'Edit patient data',
    'All fields are required': 'All fields are required',
    'Main': 'Main',
    'Reason should be provided': 'Reason should be provided',
    'Additional Investigation': 'Additional Investigation',
    'Passport': 'Passport',
    'Insurance': 'Insurance',
    'Take a photo': 'Take a photo',
    'Take a new photo': 'Take a new photo',
    'Documents': 'Documents'
  }
}

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  token: [{name: 'token', authType: 'bearer', foundIn: 'response'}],
  auth: require('./http/auth/bearer'),
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

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: Vue.router,
  i18n
})
