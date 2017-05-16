<template>
    <div class="card">
        <div class="card-body">
            <div class="form">
            <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                    <div class="row">
                        <div class="col-3">
                            <label class="label">{{ $t('Case type') }}</label>
                        </div>
                        <div class="col-7">
                            <case-selector ref="caseType"></case-selector>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                    <div class="form-group">
                        <services-block ref="servicesBlock"></services-block>
                    </div>
                    <div class="form-group">
                        <surveys-block ref="surveysBlock"></surveys-block>
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
                            <div :class="withInvestigation ? 'col-sm-6': 'col-sm-12'">
                                <textarea class="form-control"
                                          :placeholder="$t('Diagnose')" rows="10"></textarea>
                            </div>
                            <div class="col-sm-6" v-if="withInvestigation">
                                <textarea name="investigation" rows="10"
                                          :placeholder="$t('Additional Investigation')" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row mt-4">
                            <div class="col-sm-8 text-right mx-auto">
                                <div class="total h4">
                                    {{ $t('Total') }}: 2000 &euro;
                                </div>
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
            <div slot="modal-body">
                <b-alert :show="!rejectValid" state="danger" dismissible>
                    {{ $t('Reason should be provided') }}
                </b-alert>

                <textarea :placeholder="$t('Reject Reason')" class="form-control"
                          v-model="rejectCommentary"
                          @keyup.enter="doReject"
                ></textarea>
            </div>
            <span slot="modal-footer">
                <button class="btn btn-warning" @click="sendReject">{{ $t('Reject') }}</button>
            </span>
        </b-modal>

    </div>
</template>
<style lang="scss">
    @import "../../sass/variables";

    .form {
        .label {
            font-weight: $font-weight-bold;
            color: $gray-light;
            margin-bottom: 0;
        }
    }
</style>
<script>
  import ServicesBlock from '../../blocks/servicesBlock.vue'
  import SurveysBlock from '../../blocks/surveyBlock.vue'
  import AccidentProvider from '../../providers/accident.vue'
  import CaseSelector from '../case/caseTypeSelector.vue'

  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    components: {
      ServicesBlock,
      SurveysBlock,
      AccidentProvider,
      CaseSelector
    },
    mounted: function () {
      this.fetchData()
    },
    data () {
      return {
        rejectCommentary: '',
        rejectValid: true,
        withInvestigation: false
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    methods: {
      fetchData () {
        let started = 0
        this.loadingBarWrapper.ref.start()
        started++
        AccidentProvider.getServices(this.id).then(
          response => {
            this.$refs.servicesBlock.setSelectedServices(response.data.services)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.httpErrorWrapper.ref.error(err)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        AccidentProvider.getCaseType(this.id).then(
          response => {
            this.$refs.caseType.select(response.data)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.httpErrorWrapper.ref.error(err)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        )

        started++
        AccidentProvider.getSurveys(this.id).then(
          response => {
            this.$refs.surveysBlock.setSelectedSurveys(response.data.surveys)
            if (--started <= 0) {
              this.loadingBarWrapper.ref.done()
            }
          }
        ).catch(
          err => {
            this.httpErrorWrapper.ref.error(err)
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

      sendReject () {
        if (this.isRejectValid()) {
          this.loadingBarWrapper.ref.start()
          AccidentProvider.reject(this.id, this.rejectCommentary).then(
            response => {
              this.$refs.surveysBlock.setSelectedSurveys(response.data.surveys)
              this.loadingBarWrapper.ref.done()
              this.$root.$on('hidden::modal', () => {
                this.$emit('rejected')
              })
              this.$refs.rejectCaseModal.hide()
            }
          ).catch(
            err => {
              this.httpErrorWrapper.ref.error(err)
              this.loadingBarWrapper.ref.done()
            }
          )
        }
      },

      doAccept () {
        AccidentProvider.save(this.id, {
          services: [],
          surveys: []
        }).then(
          response => {
            this.$refs.surveysBlock.setSelectedSurveys(response.data.surveys)
            this.loadingBarWrapper.ref.done()
            this.$root.$off('hidden::modal').$on('hidden::modal', () => {
              this.$emit('accepted')
            })
            this.$refs.rejectCaseModal.hide()
          }
        ).catch(
          err => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.done()
          }
        )
      }
    }
  }
</script>
