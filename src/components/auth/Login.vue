<template>
  <div class="entrance">
    <input type="text" class="login" :value="login">
    <input type="password" class="password" :value="password">
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      login: '',
      password: ''
    }
  }
}
</script>
