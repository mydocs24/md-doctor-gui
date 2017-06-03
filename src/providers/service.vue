<script>
  /**
   * Services
   */
  import axios from 'axios'

  const servicesUrl = 'doctor/services'

  export default {
    getUrl () {
      return servicesUrl
    },
    get () {
      return axios.get(this.getUrl())
    },
    post (data) {
      return axios.post(this.getUrl(), data)
    }
  }
</script>
