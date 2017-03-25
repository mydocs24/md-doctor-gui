<script>
  /**
   * Information about current doctor
   */
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  const doctorUrl = 'doctor/me'

  export default {
    components: {},
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
      return doctorUrl
    },
    get () {
      return Vue.http.get(this.getUrl(), this.httpOptions)
    },
    save (data) {
      return Vue.http.post(this.getUrl(), data)
    }
  }
</script>
