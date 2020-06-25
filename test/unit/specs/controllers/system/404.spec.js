import Vue from 'vue'
import ControllerSystem404 from 'src/controllers/system/404.vue'

describe('ControllerSystem404', function () {

    it('render', function () {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(ControllerSystem404)
        })

        expect(vm.$el.querySelector('.error-message').textContent).to.equal('beautiful 404 (hello vue)')
    })
})
