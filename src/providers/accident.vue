<script>
  import axios from 'axios'

  const accidentUrl = 'doctor/accidents'
  export default {
    getUrl () {
      return accidentUrl
    },
    get () {
      return axios.get(this.getUrl())
    },
    getAccident (id) {
      return axios.get(this.getUrl() + '/' + id)
    },
    save (id, data) {
      return axios.patch(this.getUrl() + '/' + id, data)
    },

    /**
     * Services from this case
     * @param id
     */
    getServices (id) {
      return axios.get(this.getUrl() + '/' + id + '/services')
    },
    getCaseType (id) {
      return axios.get(this.getUrl() + '/' + id + '/caseType')
    },
    getPatient (id) {
      return axios.get(this.getUrl() + '/' + id + '/patient')
    },
    getRegularityStatus (id) {
      return axios.get(this.getUrl() + '/' + id + '/status')
    },
    getSurveys (id) {
      return axios.get(this.getUrl() + '/' + id + '/surveys')
    },
    patchPatient (id, patientData) {
      return axios.patch(this.getUrl() + '/' + id + '/patient', patientData)
    },
    reject (id, commentary) {
      return axios.patch(this.getUrl() + '/' + id + '/reject', {comment: commentary})
    }
  }
</script>
