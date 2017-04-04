<template>
    <div>
        <div class="row" v-if="doctorCase">
            <div class="col-sm-12 col-lg-9 mx-auto">
                <top-progress ref="topProgress" color="orange"></top-progress>
                <breadcrumbs :items="bcItems"></breadcrumbs>
                <div class="row mb-4">
                    <div class="col-sm-8 col-md-7 col-lg-6">
                        <patient-info-card
                            :name="doctorCase.userName"
                            :phones="doctorCase.accident.phones"
                            :address="doctorCase.address"
                            :symptoms="doctorCase.accident.reason"
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
                        &copy; 2017 <a href="">MyDoctors24.com</a>
                    </p>
                </footer>
            </div>
        </div>

        <b-modal ref="rejectCaseModal">
            <h4 slot="modal-header">Reject case</h4>
            <div slot="modal-body">
                <textarea placeholder="Reject reason" class="form-control"
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
        <http-error-component></http-error-component>
    </div>
</template>

<style lang="scss">
    @import "../sass/variables";
</style>

<script>
  import topProgress from 'vue-top-progress'
  import Breadcrumbs from '../components/layout/breadcrumbs.vue'
  import PatientInfoCard from '../components/patient/infoCard.vue'
  import PatientDocumentsLoader from '../components/patient/documentsLoader.vue'
  import AccidentRegularityStatus from '../components/accdident/regularityStatus.vue'
  import CaseEditForm from '../components/case/editForm.vue'
  import AccidentProvider from '../providers/accident.vue'
  import HttpErrorComponent from '../components/ui/http/error.vue'

  export default {
    components: {
      topProgress,
      Breadcrumbs,
      PatientInfoCard,
      PatientDocumentsLoader,
      AccidentRegularityStatus,
      CaseEditForm,
      HttpErrorComponent
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
        this.doctorCase = null
        AccidentProvider.getAccident(this.$route.params.id).then(
          (response) => {
            this.doctorCase = response.body
            // put it into breadcrumbs
            this.bcItems.push({
              text: this.doctorCase.accident.refNum,
              active: true
            })
          },
          (err) => {
            if (HttpErrorComponent && HttpErrorComponent.error) {
              HttpErrorComponent.error(err)
            } else {
              this.error.text = err.statusText
              this.error.code = err.status
              this.error.description = err.url
              this.error.show = true
            }
          }
        )
      },

      // handle some error like ajax not working
      errorhandle (err) {
        console.error(err)
      },

      onLink (item) {
        console.log(item)
      },

      doReject () {
        console.log('will be done reject')
        this.$refs.rejectCaseModal.show()
      },

      sendReject () {
        this.$refs.rejectCaseModal.hide()
      }
    }
  }
</script>
