<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent="onOpen">+ {{ $t('Add new service') }}</button>

        <b-modal ref="serviceEditorModal">
            <h4 slot="modal-header">{{ $t('New service') }}</h4>
            <div slot="modal-body">
                <div class="form">
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Title') }}</label>
                            <input type="text" class="form-control" :placeholder="$t('Service title')">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Description') }}</label>
                            <input type="text" class="form-control" :placeholder="$t('Service description')">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Price') }}</label>
                            <input type="number" class="form-control" :placeholder="$t('Price')">
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
  // import ServiceModel from '../../models/service.vue'

  export default {
    components: {},
    data () {
      return {
        service: null
      }
    },
    methods: {
      onClose () {
        this.$refs.serviceEditorModal.hide()
      },
      onOpen () {
        this.$refs.serviceEditorModal.show()
      },
      onSave () {
        this.$events.fire('service-editor:save', this.service, event)
      }
    }
  }
</script>
