<script>
  /**
   * Services
   */
  import Vue from 'vue'

  const caseTypesUrl = 'doctor/caseTypes'

  export default {
    getUrl () {
      return caseTypesUrl
    },
    get () {
      return Vue.axios.get(this.getUrl())
    }
  }
</script>
