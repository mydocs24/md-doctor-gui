<script>
  /**
   * Services
   */
  import axios from 'axios'

  const surveysUrl = 'doctor/surveys'

  export default {
    getUrl () {
      return surveysUrl
    },
    get () {
      return axios.get(this.getUrl(), this.httpOptions)
    },
    post (data) {
      return axios.post(this.getUrl(), data)
    }
  }
</script>
