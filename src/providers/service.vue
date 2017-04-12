<script>
  /**
   * Services
   */
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  const servicesUrl = 'doctor/services'

  export default {
    data () {
      return {
        httpOptions: {
          type: Object,
          'default': function () {
            return {}
          }
        }
      }
    },
    getUrl () {
      return servicesUrl
    },
    get () {
      return Vue.http.get(this.getUrl(), this.httpOptions)
    },
    post (data) {
      return Vue.http.post(this.getUrl(), data)
    }
  }
</script>
