// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

Vue.use(VueRouter)
Vue.use(VueI18n)

// components
import App from './App'
import Hello from './controllers/Hello'
import NotFoundComponent from './controllers/system/404'

// routes
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

const routes = [
  // default component when page not found
  { path: '/' },
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
// ready translated locales
var locales = {
  en: {
    message: {
      hello: 'hello world'
    }
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
  components: { App },
  router
})
