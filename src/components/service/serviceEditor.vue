<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent="onOpen">+ {{ $t('Add new service') }}</button>

        <b-modal ref="serviceEditorModal">
            <h5 slot="modal-header">{{ $t('New service') }}</h5>
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
                                    :placeholder="$t('Service title')"
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
                                    :placeholder="$t('Service description')"
                                    required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Price') }}</label>
                            <input
                                    @change="onChange"
                                    class="form-control"
                                    :placeholder="$t('Price')"
                                    v-model="price"
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
        <top-progress ref="topProgress" color="orange"></top-progress>
        <http-error-component></http-error-component>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import topProgress from 'vue-top-progress'
  import HttpErrorComponent from '../../components/ui/http/error.vue'
  import ServiceProvider from '../../providers/service.vue'

  export default {
    components: {
      topProgress,
      HttpErrorComponent
    },
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
        this.$refs.serviceEditorModal.hide()
      },
      onOpen () {
        this.$refs.serviceEditorModal.show()
      },
      onChange () {
        this.valid = true
      },
      isValid () {
        if (this.title.length && this.description.length && this.price.length) {
          this.valid = true
        } else {
          this.valid = false
        }

        return this.valid
      },
      onSave () {
        if (this.isValid()) {
          this.$refs.topProgress.start()
          ServiceProvider.post().then(
            response => {
              this.onClose()
              this.$events.fire('service-selector:change', response.data.service, event)
              this.$refs.topProgress.done()
            },
            err => {
              HttpErrorComponent.error(err)
              this.$refs.topProgress.done()
            }
          )
        }
      }
    }
  }
</script>
