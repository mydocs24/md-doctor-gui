// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import VueEvents from 'vue-events'
import App from './App'
import Hello from './controllers/Hello'
import NotFoundComponent from './controllers/system/404'
import FakeHttp from './fake/httpAxios.vue'

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
const messages = {
  en: {
    'MeDoctor': 'MeDoctor',
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
    'Additional Investigation': 'Additional Investigation'
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

// set locales
/*
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
*/

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App, FakeHttp },
  router,
  i18n
})
