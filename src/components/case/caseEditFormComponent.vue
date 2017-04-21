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
                        <div class="row">
                            <div class="col-sm-7">
                                <label for="survey" class="label">{{ $t('Survey') }}</label>
                                <select name="survey" id="survey" class="form-control">
                                    <option value="1">Survey 1</option>
                                    <option value="1">Survey 2</option>
                                    <option value="1">Survey 3</option>
                                </select>
                            </div>
                            <div class="col-sm-5">
                                <div class="mt-sm-4 text-right">
                                    <button class="btn btn-sm" @click.prevent>+ {{ $t('Add survey') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-12 mx-auto">
                                <div class="row">
                                    <div class="col-4">
                                        <label for="diagnostic" class="label">{{ $t('Diagnostic') }}</label>
                                    </div>
                                    <div class="col-8 text-right">
                                        <a>{{ $t('Additional investigation') }}</a>
                                    </div>
                                </div>
                                <textarea class="form-control" name="diagnostic" id="diagnostic"
                                          rows="10"></textarea>
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
                    <button class="btn btn-lg btn-warning" @click="doReject()">{{ $t('Reject') }}</button>
                </div>
                <div class="col-6 text-center">
                    <button class="btn btn-lg btn-success">{{ $t('Accept') }}</button>
                </div>
            </div>
        </div>
        <top-progress ref="topProgressCaseEditForm" color="orange"></top-progress>
        <http-error-component ref="httpErrorCaseEditForm"></http-error-component>
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
  import topProgress from 'vue-top-progress'
  import HttpErrorComponent from '../../components/ui/http/error.vue'
  import ServicesBlock from '../../blocks/servicesBlock.vue'
  import AccidentProvider from '../../providers/accident.vue'
  import CaseSelector from '../case/caseTypeSelector.vue'

  export default {
    components: {
      ServicesBlock,
      topProgress,
      HttpErrorComponent,
      AccidentProvider,
      CaseSelector
    },
    mounted: function () {
      this.fetchData()
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
        this.$refs.topProgressCaseEditForm.start()
        started++
        AccidentProvider.getServices(this.id).then(
          response => {
            this.$refs.servicesBlock.setSelectedServices(response.data.services)
            if (--started <= 0) {
              this.$refs.topProgressCaseEditForm.done()
            }
          }
        ).catch(
          err => {
            this.$refs.httpErrorCaseEditForm.error(err)
            if (--started <= 0) {
              this.$refs.topProgressCaseEditForm.done()
            }
          }
        )

        started++
        AccidentProvider.getCaseType(this.id).then(
          response => {
            this.$refs.caseType.select(response.data)
            if (--started <= 0) {
              this.$refs.topProgressCaseEditForm.done()
            }
          }
        ).catch(
          err => {
            this.$refs.httpErrorCaseEditForm.error(err)
            if (--started <= 0) {
              this.$refs.topProgressCaseEditForm.done()
            }
          }
        )
      }
    }
  }
</script>
