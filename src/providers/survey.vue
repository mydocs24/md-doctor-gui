<script>
  /**
   * Services
   */
  import Vue from 'vue'

  const surveysUrl = 'doctor/surveys'

  export default {
    getUrl () {
      return surveysUrl
    },
    get () {
      return Vue.axios.get(this.getUrl(), this.httpOptions)
    },
    post (data) {
      return Vue.axios.post(this.getUrl(), data)
    }
  }
</script>
