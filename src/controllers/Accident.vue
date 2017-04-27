<template>
    <div v-if="doctorCase">
        <div class="row">
            <div class="col-sm-12 col-lg-9 mx-auto">
                <breadcrumbs :items="bcItems"></breadcrumbs>
                <div class="row mb-4">
                    <div class="col-sm-8 col-md-7 col-lg-6">
                        <patient-info-card
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
                ></case-edit-form>
                <footer class="footer">
                    <p class="mb-3 mt-2 text-center">
                        &copy; 2017 <a :href="$t('root_url')">{{ $t('MyDoctors24.com') }}</a>
                    </p>
                </footer>
            </div>
        </div>

        <b-modal ref="rejectCaseModal">
            <h4 slot="modal-header">{{ $t('Reject Case') }}</h4>
            <div slot="modal-body">
                <textarea :placeholder="$t('Reject Reason')" class="form-control"
                          v-model="rejectCommentary"
                          @keyup.enter="doReject"
                ></textarea>
            </div>
            <span slot="modal-footer">
                <button class="btn btn-warning" @click="sendReject()">Reject</button>
            </span>
        </b-modal>

        <div v-if="error.show">
            <h3 class="error-code">{{error.code}}</h3>
            <h4 class="error-text">{{error.text}} <small>{{error.description}}</small></h4>
        </div>
        <patient-editor ref="patientEditor" :doctorCaseId="doctorCase.id"></patient-editor>
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
        rejectCommentary: '',
        error: {
          show: false,
          code: 0,
          title: '',
          description: ''
        },
        src: '',
        doctorCase: null,
        bcItems: [{
          text: 'Main',
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
            this.doctorCase = response.body
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

      doReject () {
        console.log('will be done reject')
        this.$refs.rejectCaseModal.show()
      },

      sendReject () {
        this.$refs.rejectCaseModal.hide()
      },

      openPatientEditor () {
        this.$refs.patientEditor.open(this.doctorCase.id)
      }
    }
  }
</script>
