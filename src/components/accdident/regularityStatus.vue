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
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
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
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.getRegularityStatus(this.id).then(
          (response) => {
            this.status = response.body
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
          }
        )
      }
    }
  }
</script>
