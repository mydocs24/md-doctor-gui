// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

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
        'new': 'New'
      }
    },
    'date': 'Date',
    'refNum': 'Referral Num',
    'city': 'City',
    'status': 'Status',
    'total': 'Total',
    'copy': 'Copy',
    'sign': 'Sign',
    'send': 'Send',
    'Show filters': 'Show filters',
    'Hide filters': 'Hide filters',
    'My Cases': 'My Cases',
    'Close': 'Close'
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
