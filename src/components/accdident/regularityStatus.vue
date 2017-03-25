<template>
    <div>
        <div v-if="status===false" class="text-muted">Loading...</div>
        <div v-if="status==='new'" class="text-success">First Appointment</div>
        <div v-if="status==='old'" class="text-warning">Reiterative Appointment</div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  export default {
    params: {
      id: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        status: false
      }
    }
  }
</script>
