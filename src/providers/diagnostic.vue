<script>
  /**
   * Services
   */
  import Vue from 'vue'

  const diagnosticsUrl = 'doctor/diagnostics'

  export default {
    getUrl () {
      return diagnosticsUrl
    },
    get () {
      return Vue.axios.get(this.getUrl())
    },
    post (data) {
      return Vue.axios.post(this.getUrl(), data)
    }
  }
</script>
