<script>
  /**
   * Services
   */
  import axios from 'axios'

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
      return axios.get(this.getUrl(), this.httpOptions)
    },
    post (data) {
      return axios.post(this.getUrl(), data)
    }
  }
</script>
