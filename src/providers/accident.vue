<script>
  import Vue from 'vue'

  const accidentUrl = 'doctor/accidents'
  export default {
    getUrl () {
      return accidentUrl
    },
    get () {
      return Vue.axios.get(this.getUrl())
    },
    getAccident (id) {
      return Vue.axios.get(this.getUrl() + '/' + id)
    },
    save (id, data) {
      return Vue.axios.patch(this.getUrl() + '/' + id, data)
    },

    /**
     * Services from this case
     * @param id
     */
    getServices (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/services')
    },
    getCaseType (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/caseType')
    },
    getPatient (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/patient')
    },
    getRegularityStatus (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/status')
    },
    getSurveys (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/surveys')
    },
    patchPatient (id, patientData) {
      return Vue.axios.patch(this.getUrl() + '/' + id + '/patient', patientData)
    },
    getDiagnostics (id) {
      return Vue.axios.get(this.getUrl() + '/' + id + '/diagnostics')
    },
    createDiagnostic (id, data) {
      return Vue.axios.post(this.getUrl() + '/' + id + '/diagnostics', data)
    },
    reject (id, commentary) {
      return Vue.axios.patch(this.getUrl() + '/' + id + '/reject', {comment: commentary})
    }
  }
</script>
