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
    data () {
      return {}
    },
    methods: {
      error (err) {
        let title
        let text

        if (err.status === 401) {
          title = 'Authorization'
          text = 'You can\'t load list while you are not authorized.'
        } else if (err.status === 0) {
          title = 'Request Error'
          text = 'Not a CORS response'
        } else {
          title = 'Request Error'
          text = '"' + err.status + '" ' + err.statusText
        }

        this.$refs.httpError.show(title, text)
      }
    }
  }
</script>
