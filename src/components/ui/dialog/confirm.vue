<template>
    <b-modal ref="confirmModal">
        <h4 slot="modal-header">{{ title }}</h4>
        <div slot="modal-body">
            {{ text }}
            <ul v-if="list">
                <li v-for="item in list">{{item}}</li>
            </ul>
        </div>
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
        list: null,
        success: function () {}
      }
    },
    methods: {
      onAccept () {
        this.success()
      },
      onClose () {
        this.$refs.confirmModal.hide()
      },
      show (title, text, success, list) {
        this.title = title
        this.text = text
        this.success = success
        this.list = list
        this.$refs.confirmModal.show()
      }
    }
  }
</script>
