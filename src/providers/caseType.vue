<script>
  /**
   * Services
   */
  import axios from 'axios'

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
      return axios.get(this.getUrl(), this.httpOptions)
    }
  }
</script>
