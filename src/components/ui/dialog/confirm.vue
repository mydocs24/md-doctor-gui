<template>
    <b-modal ref="confirmModal">
        <h4 slot="modal-header">{{ title }}</h4>
        <div slot="modal-body">{{ text }}</div>
        <span slot="modal-footer">
                <button class="btn btn-primary" @click="onAccept()">{{ $t('Accept') }}</button>
                <button class="btn btn-secondary" @click="onClose()">{{ $t('Decline') }}</button>
            </span>
    </b-modal>
</template>
<style lang="scss">
</style>
<script>
  export default {
    data () {
      return {
        title: '',
        text: '',
        success: function () {}
      }
    },
    methods: {
      onAccept () {
        this.success()
      },
      onClose () {
        this.$refs.feedbackModal.hide()
      },
      show (title, text, success) {
        this.title = title
        this.text = text
        this.success = success
        this.$refs.confirmModal.show()
      }
    }
  }
</script>
