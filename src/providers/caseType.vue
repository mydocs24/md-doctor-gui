<script>
  /**
   * Services
   */
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  const caseTypesUrl = 'doctor/caseTypes'

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
      return caseTypesUrl
    },
    get () {
      return Vue.http.get(this.getUrl(), this.httpOptions)
    }
  }
</script>
