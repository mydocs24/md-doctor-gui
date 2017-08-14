<template>
    <div class="card card-copy">
        <div class="card-block m-1">
            @ 2017 MyDoctor <a href="/about">{{ $t('About') }}</a>
            <a href="/help">{{ $t('Help') }}</a>
            <a href="/privacy">{{ $t('Privacy') }}</a>
            <a href="/terms">{{ $t('Terms') }}</a>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../sass/variables";
    .card-copy {
        font-size: $font-size-sm;
    }
</style>
<script>
  export default {
    components: {},
    data () {
      return {}
    }
  }
</script>
