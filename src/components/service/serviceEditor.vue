<template>
    <div>
        <button class="btn btn-sm btn-info" @click.prevent>+ {{ $t('Add new service') }}</button>
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
      onSave () {
        this.$events.fire('service-editor:save', this.service, event)
      }
    }
  }
</script>
