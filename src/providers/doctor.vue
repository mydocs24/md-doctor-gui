<script>
  /**
   * Information about current doctor
   */
  import Vue from 'vue'

  const doctorUrl = 'doctor/me'
  const langUrl = 'doctor/lang/'

  export default {
    getUrl () {
      return doctorUrl
    },
    get () {
      return Vue.axios.get(this.getUrl())
    },
    save (data) {
      return Vue.axios.put(this.getUrl(), data)
    },
    lang (lang) {
      return Vue.axios.get(langUrl + lang)
    }
  }
</script>
