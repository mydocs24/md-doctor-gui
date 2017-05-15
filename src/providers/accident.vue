<script>
  import axios from 'axios'

  const accidentUrl = 'doctor/accidents'
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
      return accidentUrl
    },
    get () {
      return axios.get(this.getUrl(), this.httpOptions)
    },
    getAccident (id) {
      return axios.get(this.getUrl() + '/' + id, this.httpOptions)
    },
    save (id, data) {
      return axios.patch(this.getUrl() + '/' + id, data, this.httpOptions)
    },

    /**
     * Services from this case
     * @param id
     */
    getServices (id) {
      return axios.get(this.getUrl() + '/' + id + '/services', this.httpOptions)
    },
    getCaseType (id) {
      return axios.get(this.getUrl() + '/' + id + '/caseType', this.httpOptions)
    },
    getPatient (id) {
      return axios.get(this.getUrl() + '/' + id + '/patient', this.httpOptions)
    },
    getRegularityStatus (id) {
      return axios.get(this.getUrl() + '/' + id + '/status', this.httpOptions)
    },
    getSurveys (id) {
      return axios.get(this.getUrl() + '/' + id + '/surveys', this.httpOptions)
    },
    patchPatient (id, patientData) {
      return axios.patch(this.getUrl() + '/' + id + '/patient', patientData, this.httpOptions)
    },
    reject (id, commentary) {
      return axios.patch(this.getUrl() + '/' + id + '/reject', {comment: commentary})
    }
  }
</script>
