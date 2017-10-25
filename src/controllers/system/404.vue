<template>
  <div class="content-404">
      <div class="error-title">{{ $t('404 Page Not Found') }}</div>
      <img src="../../../static/mc_240.png" class="mt-5" width="240" height="240" :alt="$t('Medical Company')">
      <div class="error-text text-muted">{{ $t('URL of this page is incorrect') }}</div>
      <router-link class="home-link" to="/" v-html="$t('Go to the main page')"></router-link>
  </div>
</template>

<style lang="scss">
    .content-404 {
        display: flex;
        flex-flow: column;
        position: relative;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .error-title {
            margin-top: 30px;
            font-size: 20px;
            font-weight: 500;
        }

        .error-text {
            font-size: 3em;
            font-weight: 500;
            margin: 10px 0;
        }

        .home-link {
            margin-top: 20px;
        }
    }
</style>

<script>
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
    }
  }
</script>
