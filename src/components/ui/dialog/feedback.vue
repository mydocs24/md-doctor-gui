<template>
    <b-modal ref="feedbackModal" size="sm">
        <h4 slot="modal-header">{{ title }}</h4>
        <div slot="modal-body">{{ text }}</div>
        <span slot="modal-footer">
                <button :class="btnClass" class="btn" @click.prevent="onClose()">{{ $t('Close') }}</button>
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
        btnClass: 'btn-danger'
      }
    },
    methods: {
      onClose () {
        this.$refs.feedbackModal.hide()
      },
      show (title, text) {
        this.title = title
        this.text = text
        this.$refs.feedbackModal.show()
      }
    }
  }
</script>
