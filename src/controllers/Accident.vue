<template>
    <div v-if="doctorCase">
        <div class="row">
            <div class="col-sm-12 col-lg-9 mx-auto">
                <breadcrumbs :items="bcItems"></breadcrumbs>
                <div class="row mb-4">
                    <div class="col-sm-8 col-md-7 col-lg-6">
                        <patient-info-card
                                ref="patientInfoCard"
                                :doctor-case-id="doctorCase.id"
                                @on-edit="openPatientEditor"
                        ></patient-info-card>
                    </div>
                    <div class="col-sm-4 col-lg-5 col-lg-6">
                        <accident-regularity-status
                            class="text-right mb-1"
                            :id="doctorCase.id"
                        ></accident-regularity-status>

                        <patient-documents-loader
                            :id="doctorCase.id"
                        ></patient-documents-loader>
                    </div>
                </div>
                <case-edit-form
                    :id="doctorCase.id"
                    @accepted="onAccepted"
                    @rejected="onRejected"
                ></case-edit-form>
                <footer class="footer">
                    <p class="mb-3 mt-2 text-center">
                        &copy; 2017 <a :href="$t('root_url')">{{ $t('MyDoctors24.com') }}</a>
                    </p>
                </footer>
            </div>
        </div>

        <patient-editor
                ref="patientEditor"
                :doctorCaseId="doctorCase.id"
                @updated="patientUpdated"
        ></patient-editor>
    </div>
</template>

<style lang="scss">
    @import "../sass/variables";
</style>

<script>
  import Breadcrumbs from '../components/layout/breadcrumbs.vue'
  import PatientInfoCard from '../components/patient/infoCard.vue'
  import PatientDocumentsLoader from '../components/patient/documentsLoader.vue'
  import AccidentRegularityStatus from '../components/accdident/regularityStatus.vue'
  import CaseEditForm from '../components/case/caseEditFormComponent.vue'
  import AccidentProvider from '../providers/accident.vue'
  import PatientEditor from '../components/patient/editor.vue'

  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    components: {
      Breadcrumbs,
      PatientInfoCard,
      PatientDocumentsLoader,
      AccidentRegularityStatus,
      CaseEditForm,
      PatientEditor
    },
    data () {
      return {
        src: '',
        doctorCase: null,
        bcItems: [{
          text: this.$t('Main'),
          link: '/doctor'
        }]
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        this.doctorCase = null
        AccidentProvider.getAccident(this.$route.params.id).then(
          (response) => {
            this.doctorCase = response.data
            // put it into breadcrumbs
            this.bcItems.push({
              text: this.doctorCase.accident.refNum,
              active: true
            })
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
          }
        )
      },

      openPatientEditor () {
        this.$refs.patientEditor.open(this.doctorCase.id)
      },

      patientUpdated () {
        this.$refs.patientInfoCard.reload()
      },

      onAccepted () {
        this.$router.push({ path: '/' })
      },

      onRejected () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>
