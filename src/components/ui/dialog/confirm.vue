<template>
    <b-modal ref="confirmModal">
        <h4 slot="modal-header">{{ title }}</h4>
        {{ text }}
        <ul v-if="list" class="list-unstyled">
            <li class="list-item pl-3" v-for="item in list">{{item}}</li>
        </ul>
        <span slot="modal-footer">
                <button class="btn btn-primary" @click="onAccept()">{{ $t('Accept') }}</button>
                <button class="btn btn-secondary" @click="onClose()">{{ $t('Decline') }}</button>
            </span>
    </b-modal>
</template>
<style lang="scss">
    .list-item {
        font-weight: 700;
    }
</style>
<script>
  export default {
    data () {
      return {
        title: '',
        text: '',
        list: null,
        success: () => {}
      }
    },
    methods: {
      onAccept () {
        this.success()
      },
      onClose () {
        this.$refs.confirmModal.hide()
      },
      show (title, text, list, success) {
        this.$refs.confirmModal.show()
        this.title = title
        this.text = text
        this.success = success
        this.list = list
      }
    }
  }
</script>
