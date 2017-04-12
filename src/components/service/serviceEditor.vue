<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent="onOpen">+ {{ $t('Add new service') }}</button>

        <b-modal ref="serviceEditorModal">
            <h5 slot="modal-header">{{ $t('New service') }}</h5>
            <div slot="modal-body">
                <div class="form">
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Title') }}</label>
                            <input type="text" class="form-control" v-model="title" :placeholder="$t('Service title')">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Description') }}</label>
                            <input
                                    class="form-control"
                                    v-model="description"
                                    :placeholder="$t('Service description')">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12">
                            <label class="label">{{ $t('Price') }}</label>
                            <input
                                    class="form-control"
                                    :placeholder="$t('Price')"
                                    v-model="price">
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
    </div>
</template>
<style lang="scss">
</style>
<script>
  import topProgress from 'vue-top-progress'
  import ServiceProvider from '../../providers/service.vue'

  export default {
    components: {
      topProgress
    },
    data () {
      return {
        title: '',
        description: '',
        price: ''
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
        this.$refs.topProgress.start()
        ServiceProvider.post().then(
          service => {
            this.$events.fire('service-editor:created', service, event)
            this.$refs.topProgress.done()
          },
          err => {
            console.log(err)
            this.$refs.topProgress.done()
          }
        )
      }
    }
  }
</script>
