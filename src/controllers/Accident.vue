<template>
    <div class="main accident-page">
        <div v-if="doctorCase">
            <div class="row">
                <div class="col-sm-12 col-lg-9 mx-auto">
                    <breadcrumbs :items="bcItems"></breadcrumbs>
                    <div class="row mb-4">
                        <div class="col-sm-8 col-md-7 col-lg-6">
                            <patient-info-card
                                    class="patient-card"
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
                                :uploadUrl="uploadUrl"
                            ></patient-documents-loader>
                        </div>
                    </div>

                    <div class="card-group mb-4 extra-information" v-if="doctorCase.contacts.length || doctorCase.symptoms.length">
                        <div class="card text-white bg-dark">
                            <div class="card-header">
                                {{ $t('Contacts') }}
                            </div>
                            <div class="card-body">
                                <div class="card-text with-br">{{ doctorCase.contacts }}</div>
                            </div>
                        </div>
                        <div class="card text-white bg-secondary">
                            <div class="card-header">
                                {{ $t('Symptoms') }}
                            </div>
                            <div class="card-body">
                                <div class="card-text with-br">{{ doctorCase.symptoms }}</div>
                            </div>
                        </div>
                    </div>

                    <case-edit-form
                        :doctorCase="doctorCase"
                        @accepted="onAccepted"
                        @rejected="onRejected"
                    ></case-edit-form>

                    <footer class="footer">
                        <p class="mb-3 mt-2 text-center small">
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
    </div>
</template>

<style lang="scss">
    @import "../sass/variables";
    .accident-page {
        .patient-card {
            height: 100%;
        }
        .extra-information {
            .with-br {
                font-weight: 200;
                white-space: pre-line;
            }
        }
    }
</style>

<script>
  import Breadcrumbs from '../components/layout/breadcrumbs.vue'
  import PatientInfoCard from '../components/patient/infoCard.vue'
  import PatientDocumentsLoader from '../components/patient/documentsLoader.vue'
  import AccidentRegularityStatus from '../components/accdident/regularityStatus.vue'
  import CaseEditForm from '../components/case/caseEditFormComponent.vue'
  import AccidentProvider from '../providers/accident.vue'
  import PatientEditor from '../components/patient/editor.vue'
  import axios from 'axios'

  export default {
    inject: ['loadingBarWrapper'],
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
          link: '/'
        }],
        uploadUrl: ''
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        this.doctorCase = null
        AccidentProvider.getAccident(this.$route.params.id).then(
          (response) => {
            this.doctorCase = response.data.data
            // put it into breadcrumbs
            this.bcItems.push({
              text: this.doctorCase.ref_num,
              active: true
            })
            this.uploadUrl = axios.defaults.baseURL + AccidentProvider.getDocumentsUrl(this.doctorCase.id)
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get Accident'),
              consoleMessage: err.message
            })
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
