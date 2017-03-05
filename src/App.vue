<template>
  <div id="app" class="container">

    <div>
      <router-link to="/">Main</router-link>
      <router-link to="/component1">Component 1</router-link>
      <router-link to="/component2">Component 2</router-link>
      <router-link to="/hello">Hello</router-link>
    </div>

    <router-view></router-view>

  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import "sass/variables";
@import "sass/style";
</style>
