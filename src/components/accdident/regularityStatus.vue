<template>
    <div>
        <div v-if="status===false" class="text-muted">{{ $t('Loading...') }}</div>
        <div v-if="status==='new'" class="text-success">{{ $t('First Appointment') }}</div>
        <div v-if="status==='old'" class="text-warning">{{ $t('Reiterative Appointment') }}</div>
    </div>
</template>
<script>
  import AccidentProvider from '../../providers/accident.vue'

  export default {
    inject: ['loadingBarWrapper'],
    created: function () {
      this.fetchData()
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        status: false
      }
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.getRegularityStatus(this.id).then(
          (response) => {
            this.status = response.data.data.status
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get accident status'),
              consoleMessage: err.message
            })
            this.loadingBarWrapper.ref.fail()
          }
        )
      }
    }
  }
</script>
