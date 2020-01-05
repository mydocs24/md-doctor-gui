<template>
    <div class="card">
        <div class="card-body">
            <div class="form">
              <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                  <div class="row">
                    <div class="col-3">
                      <label class="label">{{ $t('Visit time') }}</label>
                    </div>
                    <div class="col-7">
                      <masked-input v-model="visitDateTime" mask="11 / 11 / 1111 11:11" placeholder="dd / mm / yyyy hh:ii" /> <span class="btn btn-secondary btn-sm" @click="setCurrentTime">{{ $t('Set current time') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                    <div class="row">
                        <div class="col-3">
                            <label class="label">{{ $t('Case type') }}</label>
                        </div>
                        <div class="col-7">
                            <case-selector
                                    @change="onCaseTypeChanged($event)"
                                    ref="caseType"></case-selector>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                    <div class="form-group">
                        <select-component
                                :label="$t('Select Services')"
                                :title="$t('Service')"
                                :items="services"
                                :selectedItems="selectedServices"
                                @save-item="onServiceSave($event)"
                                :checkHighlighting="checkHighlighting"
                        ></select-component>
                    </div>
                    <div class="form-group">
                        <select-component
                                :label="$t('Select Surveys')"
                                :title="$t('Survey')"
                                :items="surveys"
                                :selectedItems="selectedSurveys"
                                @save-item="onSurveySave($event)"
                                :checkHighlighting="checkHighlighting"
                        ></select-component>
                    </div>
                    <div class="form-group">
                        <select-component
                            :label="$t('Select Diagnostics')"
                            :title="$t('Diagnostic')"
                            :items="diagnostics"
                            :selectedItems="selectedDiagnostics"
                            @save-item="onDiagnosticSave($event)"
                            :checkHighlighting="checkHighlighting"
                        ></select-component>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-4">
                                <label class="label">{{ $t('Diagnose') }}</label>
                            </div>
                            <div class="col-8 text-right">
                                <a @click="withInvestigation = !withInvestigation">{{ $t('Additional investigation') }}</a>
                            </div>
                        </div>
                        <div class="row">
                            <div :class="withInvestigation || investigation.length ? 'col-sm-6': 'col-sm-12'">
                                <textarea class="form-control"
                                          :placeholder="$t('Diagnose')"
                                          rows="10"
                                          v-model="diagnose"
                                ></textarea>
                            </div>
                            <div class="col-sm-6" v-if="withInvestigation || investigation.length">
                                <textarea name="investigation" rows="10"
                                          :placeholder="$t('Additional Investigation')"
                                          class="form-control"
                                          v-model="investigation"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-6 text-center">
                    <button class="btn btn-lg btn-warning" @click="doReject">{{ $t('Reject') }}</button>
                </div>
                <div class="col-6 text-center">
                    <button class="btn btn-lg btn-success" @click="doAccept">{{ $t('Accept') }}</button>
                </div>
            </div>
        </div>

        <b-modal ref="rejectCaseModal">
            <h4 slot="modal-header">{{ $t('Reject Case') }}</h4>
            <b-alert :show="!rejectValid" variant="danger" dismissible>
                {{ $t('Reason should be provided') }}
            </b-alert>

            <textarea :placeholder="$t('Reject Reason')" class="form-control"
                      :title="$t('Reject Reason')"
                      v-model="rejectCommentary"
                      @keyup.enter="doReject"
            ></textarea>
            <span slot="modal-footer">
                <button class="btn btn-info" @click="hideRejectModal">{{ $t('Cancel') }}</button>
                <button class="btn btn-warning" @click="sendReject">{{ $t('Reject') }}</button>
            </span>
        </b-modal>

    </div>
</template>
<script>
  import AccidentProvider from '../../providers/accident.vue'
  import CaseSelector from '../case/caseTypeSelector.vue'
  import SelectComponent from '../ui/selector/selector.vue'
  import DiagnosticProvider from '../../providers/diagnostic.vue'
  import SurveyProvider from '../../providers/survey.vue'
  import ServiceProvider from '../../providers/service.vue'
  import MaskedInput from 'vue-masked-input'
  import moment from 'moment'

  export default {
    inject: ['loadingBarWrapper'],
    components: {
      AccidentProvider,
      CaseSelector,
      SelectComponent,
      MaskedInput
    },
    mounted: function () {
      this.fetchData()
    },
    props: {
      doctorCase: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        id: 0,
        rejectCommentary: '',
        rejectValid: true,
        withInvestigation: false,
        // Diagnostics
        diagnostics: [],
        selectedDiagnostics: [],
        // Surveys
        surveys: [],
        selectedSurveys: [],
        // Services
        services: [],
        selectedServices: [],
        // case type
        selectedCaseType: null,
        // text
        diagnose: '',
        investigation: '',
        // visit time
        visitDateTime: '',
        // selectorHighlighter
        checkHighlighting: function (item) {
          return item && item.type === 'doctor'
        }
      }
    },
    notifications: {
      showGrowl: {type: 'info'}
    },
    methods: {
      fetchData () {
        let started = 0

        this.id = +this.doctorCase.id
        this.diagnose = this.doctorCase.diagnose
        this.investigation = this.doctorCase.investigation

        let date = moment(this.doctorCase.visitTime, 'YYYY/MM/DD hh:mm:ss')
        this.visitDateTime = date.format('DD / MM / YYYY hh:mm')

        this.loadingBarWrapper.ref.start()
        started++
        AccidentProvider.getServices(this.id).then(
          response => {
            this.selectedServices = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get accident services'),
              consoleMessage: err.message
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        AccidentProvider.getCaseType(this.id).then(
          response => {
            const caseType = response.data.data
            caseType.title = this.$t(caseType.title)
            this.$refs.caseType.select(caseType)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get case type'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        AccidentProvider.getSurveys(this.id).then(
          response => {
            this.selectedSurveys = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get surveys'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        AccidentProvider.getDiagnostics(this.id).then(
          response => {
            this.selectedDiagnostics = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get accident diagnostics'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        DiagnosticProvider.get().then(
          response => {
            this.diagnostics = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get accident diagnostics'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        SurveyProvider.get().then(
          response => {
            this.surveys = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get surveys'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        ServiceProvider.get().then(
          response => {
            this.services = response.data.data
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get services'),
              consoleMessage: err.message,
              type: 'error'
            })
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )
      },

      doReject () {
        this.rejectValid = true
        this.$refs.rejectCaseModal.show()
      },

      isRejectValid () {
        this.rejectValid = !!this.rejectCommentary.length
        return this.rejectValid
      },

      hideRejectModal () {
        this.$refs.rejectCaseModal.hide()
      },

      sendReject () {
        if (this.isRejectValid()) {
          this.loadingBarWrapper.ref.start()
          AccidentProvider.reject(this.id, this.rejectCommentary).then(
            response => {
              this.loadingBarWrapper.ref.done()
              this.$root.$on('hidden::modal', () => {
                this.$emit('rejected')
              })
              this.hideRejectModal()
            }
          ).catch(
            err => {
              this.showGrowl({
                title: this.$t('API Error'),
                message: this.$t('Reject of the accident is failed'),
                consoleMessage: err.message,
                type: 'error'
              })
              this.loadingBarWrapper.ref.done()
            }
          )
        }
      },

      doAccept () {
        let services = []
        this.selectedServices.map(service => services.push(service.id))

        let surveys = []
        this.selectedSurveys.map(survey => surveys.push(survey.id))

        let diagnostics = []
        this.selectedDiagnostics.map(diagnostic => diagnostics.push(diagnostic.id))

        let date = moment(this.visitDateTime, 'DD / MM / YYYY hh:mm')

        AccidentProvider.save(this.id, {
          services: services,
          surveys: surveys,
          diagnostics: diagnostics,
          caseType: this.selectedCaseType,
          diagnose: this.diagnose,
          investigation: this.investigation,
          visitDateTime: date.format('YYYY/MM/DD hh:mm:00')
        }).then(
          () => {
            this.showGrowl({
              title: this.$t('Success'),
              message: this.$t('Accident saved'),
              type: 'success'
            })
          }
        ).catch(
          err => {
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t save accident'),
              consoleMessage: err.message,
              type: 'error'
            })
            this.loadingBarWrapper.ref.done()
          }
        )
      },

      onDiagnosticSave (data) {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.createDiagnostic(this.id, {
          id: data.id,
          title: data.title,
          description: data.description
        }).then(
          response => {
            this.selectedDiagnostics.push(response.data)
            this.loadingBarWrapper.ref.done()
            data.editorEl.onClose()
          }
        ).catch(err => {
          this.showGrowl({
            title: this.$t('API Error'),
            message: this.$t('Can\'t create diagnostic'),
            consoleMessage: err.message,
            type: 'error'
          })
          this.loadingBarWrapper.ref.done()
        })
      },

      onSurveySave (data) {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.createSurvey(this.id, {
          id: data.id,
          title: data.title,
          description: data.description
        }).then(
          response => {
            this.selectedSurveys.push(response.data)
            this.loadingBarWrapper.ref.done()
            data.editorEl.onClose()
          }
        ).catch(err => {
          this.showGrowl({
            title: this.$t('API Error'),
            message: this.$t('Can\'t create survey'),
            consoleMessage: err.message,
            type: 'error'
          })
          this.loadingBarWrapper.ref.done()
        })
      },

      onServiceSave (data) {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.createService(this.id, {
          id: data.id,
          title: data.title,
          description: data.description
        }).then(response => {
          this.selectedServices.push(response.data)
          this.loadingBarWrapper.ref.done()
          data.editorEl.onClose()
        }).catch(err => {
          this.showGrowl({
            title: this.$t('API Error'),
            message: this.$t('Can\'t create service'),
            consoleMessage: err.message,
            type: 'error'
          })
          this.loadingBarWrapper.ref.done()
        })
      },

      onCaseTypeChanged (data) {
        this.selectedCaseType = data.id
      },

      setCurrentTime () {
        this.visitDateTime = moment().format('DD / MM / YYYY hh:mm')
      }
    }
  }
</script>
