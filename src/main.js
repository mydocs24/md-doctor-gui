// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import VueEvents from 'vue-events'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueEvents)

// components
import App from './App'

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

import Hello from './controllers/Hello'
import NotFoundComponent from './controllers/system/404'

// try faker
import FakeHttp from './fake/http.vue'

// routes
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

const routes = [
  // default component when page not found
  { path: '/', component: Dashboard },
  { path: '/doctor/accidents/:id', component: Accident },
  { path: '/doctor/profile', component: Profile },
  { path: '/component1', component: Foo },
  { path: '/component2', component: Bar },
  { path: '/hello', component: Hello },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// lang
Vue.use(VueI18n)
// ready translated locales
var locales = {
  en: {
    message: {
      hello: 'hello world',
      open: 'Open'
    },
    'case': {
      status: {
        closed: 'Closed',
        'signed': 'Signed',
        sended: 'Sended',
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
    'Diagnostic': 'Diagnostic',
    'Additional investigation': 'Additional investigation',
    'Services': 'Services'
  }
}

// set lang
Vue.config.lang = 'en'

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App, FakeHttp },
  router
})
