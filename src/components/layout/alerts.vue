<template>
    <b-alert :show="true" variant="warning" dismissible>
          This is an alert
    </b-alert>
</template>
<style lang="scss">
</style>
<script>
  /**
   * Get all alerts and show them to doctor
   * When doctor check it as read (close alert) - send status 'closed' for the alert
   */
  export default {
    components: {},
    data () {
      return {}
    }
  }
</script>
