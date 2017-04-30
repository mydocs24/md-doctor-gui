<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

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
      return Vue.http.get(this.getUrl(), this.httpOptions)
    },
    getAccident (id) {
      return Vue.http.get(this.getUrl() + '/' + id, this.httpOptions)
    },
    save (id, data) {
      return Vue.http.patch(this.getUrl() + '/' + id, data, this.httpOptions)
    },

    /**
     * Services from this case
     * @param id
     */
    getServices (id) {
      return Vue.http.get(this.getUrl() + '/' + id + '/services', this.httpOptions)
    },
    getCaseType (id) {
      return Vue.http.get(this.getUrl() + '/' + id + '/caseType', this.httpOptions)
    },
    getPatient (id) {
      return Vue.http.get(this.getUrl() + '/' + id + '/patient', this.httpOptions)
    },
    getRegularityStatus (id) {
      return Vue.http.get(this.getUrl() + '/' + id + '/status', this.httpOptions)
    },
    getSurveys (id) {
      return Vue.http.get(this.getUrl() + '/' + id + '/surveys', this.httpOptions)
    },
    patchPatient (id, patientData) {
      return Vue.http.patch(this.getUrl() + '/' + id + '/patient', patientData, this.httpOptions)
    },
    reject (id, commentary) {
      return Vue.http.patch(this.getUrl() + '/' + id + '/reject', {comment: commentary})
    }
  }
</script>
