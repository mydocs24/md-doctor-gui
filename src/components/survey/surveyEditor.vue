<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent="onOpen">+ {{ $t('Add new survey') }}</button>

        <b-modal ref="surveyEditorModal">
            <h5 slot="modal-header">{{ $t('New Survey') }}</h5>
            <div slot="modal-body">
                <div class="form">
                    <b-alert :show="!valid" state="warning" dismissible>
                        {{ $t('All fields should be filled') }}
                    </b-alert>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Title') }}</label>
                            <input
                                    @change="onChange"
                                    type="text"
                                    class="form-control"
                                    v-model="title"
                                    :placeholder="$t('Survey title')"
                                    required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Description') }}</label>
                            <input
                                    @change="onChange"
                                    class="form-control"
                                    v-model="description"
                                    :placeholder="$t('Survey description')"
                                    required>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="modal-footer">
                <button class="btn btn-primary" @click="onSave()">{{ $t('Save') }}</button>
                <button class="btn btn-secondary" @click="onClose()">{{ $t('Cancel') }}</button>
            </span>
        </b-modal>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import SurveyProvider from '../../providers/survey.vue'

  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    data () {
      return {
        title: '',
        description: '',
        price: '',
        valid: true
      }
    },
    methods: {
      onClose () {
        this.$refs.surveyEditorModal.hide()
      },
      onOpen () {
        this.$refs.surveyEditorModal.show()
      },
      onChange () {
        this.valid = true
      },
      isValid () {
        this.value = this.title.length && this.description.length
        return this.value
      },
      onSave () {
        if (this.isValid()) {
          this.loadingBarWrapper.ref.start()
          SurveyProvider.post().then(
            response => {
              this.onClose()
              this.$events.fire('survey-selector:change', response.data.survey, event)
              this.loadingBarWrapper.ref.done()
            },
            err => {
              this.httpErrorWrapper.ref.error(err)
              this.loadingBarWrapper.ref.fail()
            }
          )
        }
      }
    }
  }
</script>
