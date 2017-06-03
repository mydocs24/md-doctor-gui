<script>

  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import VueAuth from '@websanova/vue-auth'

  Vue.use(VueAxios, axios)
  Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'doctor'
  })

  // import Vue from 'vue'
  // import axios from 'axios'

  /*
  import VueAxios from 'vue-axios'
  import VueAuth from '@websanova/vue-auth'

  axios.defaults.baseURL = 'http://127.0.0.1:8000'

  Vue.use(VueAuth, {
    auth: AuthBearer,
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
  });
  */
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
</script>
