<template>
    <top-progress ref="loadingBar" color="orange"></top-progress>
</template>
<script>
  import topProgress from 'vue-top-progress'

  export default {
    components: {
      topProgress
    },
    methods: {
      start () {
        this.$refs.loadingBar.start()
      },
      done () {
        this.$refs.loadingBar.done()
      },
      fail () {
        this.$refs.loadingBar.fail()
      }
    }
  }
</script>
