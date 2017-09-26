<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent="onOpen">+ {{ $t('Add new service') }}</button>

        <b-modal ref="serviceEditorModal" id="serviceEditorModal">
            <h5 slot="modal-header">{{ $t('New service') }}</h5>
            <div class="form">
                <b-alert :show="!valid" variant="warning" dismissible>
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
  import $ from 'jquery'
  import ServiceProvider from '../../providers/service.vue'

  export default {
    inject: ['loadingBarWrapper'],
    data () {
      return {
        title: '',
        description: '',
        price: '',
        valid: true
      }
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    methods: {
      onClose () {
        this.$refs.serviceEditorModal.hide()
      },
      onOpen () {
        this.$refs.serviceEditorModal.show()
        $('#serviceEditorModal').css({display: 'block'})
      },
      onChange () {
        this.valid = true
      },
      isValid () {
        this.valid = this.title.length && this.description.length && this.price.length
        return this.valid
      },
      onSave () {
        if (this.isValid()) {
          this.loadingBarWrapper.ref.start()
          ServiceProvider.post().then(
            response => {
              this.onClose()
              this.$events.fire('service-selector:change', response.data.service, event)
              this.loadingBarWrapper.ref.done()
            },
            err => {
              this.showHttpError({
                title: this.$t('API Error'),
                message: this.$t('Can\'t save service'),
                consoleMessage: err.message
              })
              this.loadingBarWrapper.ref.fail()
            }
          )
        }
      }
    }
  }
</script>
