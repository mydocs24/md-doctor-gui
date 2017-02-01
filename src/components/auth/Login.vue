<template>
  <div class="entrance">
    <input type="text" class="login" :value="login" :placeholder="$t('auth.login')">
    <input type="password" class="password" :value="password" :placeholder="$t('auth.password')">
  </div>
</template>

<script>
export default {
  name: 'authenticate',
  data () {
    return {
      login: '',
      password: ''
    }
  }
}
</script>
