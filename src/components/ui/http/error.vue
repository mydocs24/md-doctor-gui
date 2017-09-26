<template>
    <feedback ref="httpError"></feedback>
</template>
<style lang="scss">
</style>
<script>
  import Feedback from '../dialog/feedback.vue'

  export default {
    components: {
      Feedback
    },
    methods: {
      error (err) {
        let title
        let text

        if (err.response.status === 401) {
          title = this.$t('Authorization')
          text = this.$t('You can\'t load list while you are not authorized.')
        } else if (err.response.status === 0) {
          title = this.$t('Request Error')
          text = this.$t('Not a CORS response')
        } else {
          title = this.$t('Request Error')
          text = err.message
          text += '\n\t' + err.config.url
        }

        this.$refs.httpError.show(title, text)
      }
    }
  }
</script>
