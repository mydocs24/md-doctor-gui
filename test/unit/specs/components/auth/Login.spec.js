/*
 * Copyright (c) 2017. Blog-Tree.com
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import Vue from 'vue'
import LoginComponent from 'src/components/auth/Login.vue'

describe('ComponentAuthLogin', function () {
  it('render', function () {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(LoginComponent)
    })

    expect(vm.$el.querySelector('.login').getAttribute('type')).to.equal('text')
    expect(vm.$el.querySelector('.password').getAttribute('type')).to.equal('password')
  })
})
