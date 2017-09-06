/**
 * @author A.Zagovorichev <zagovorichev@gmail.com>
 * 9/5/2017.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// lang
Vue.use(VueI18n)
// ready translated locales
const messages = {
  en: require('./en.json'),
  ru: require('./ru.json')
}

// Create VueI18n instance with options
export default new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})
