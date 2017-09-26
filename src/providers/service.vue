<script>
  /**
   * Services
   */
  import Vue from 'vue'

  const servicesUrl = 'doctor/services'

  export default {
    getUrl () {
      return servicesUrl
    },
    get () {
      return Vue.axios.get(this.getUrl())
    },
    post (data) {
      return Vue.axios.post(this.getUrl(), data)
    }
  }
</script>
