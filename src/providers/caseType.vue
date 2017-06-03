<script>
  /**
   * Services
   */
  import axios from 'axios'

  const caseTypesUrl = 'doctor/caseTypes'

  export default {
    getUrl () {
      return caseTypesUrl
    },
    get () {
      return axios.get(this.getUrl())
    }
  }
</script>
