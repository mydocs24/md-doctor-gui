import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import Hello from 'src/controllers/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App message.hello')
  })
})
