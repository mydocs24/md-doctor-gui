<script>
  /**
   * Information about current doctor
   */
  import axios from 'axios'

  const doctorUrl = 'doctor/me'

  export default {
    getUrl () {
      return doctorUrl
    },
    get () {
      return axios.get(this.getUrl())
    },
    save (data) {
      return axios.put(this.getUrl(), data)
    }
  }
</script>
