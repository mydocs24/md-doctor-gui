<script>
  /**
   * Services
   */
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  const surveysUrl = 'doctor/surveys'

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
      return surveysUrl
    },
    get () {
      return Vue.http.get(this.getUrl(), this.httpOptions)
    },
    post (data) {
      return Vue.http.post(this.getUrl(), data)
    }
  }
</script>
