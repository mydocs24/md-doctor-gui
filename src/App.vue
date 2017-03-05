<template>
  <div id="app">

    <b-navbar toggleable type="inverse" variant="mydoc">

      <b-nav-toggle target="nav_collapse"/>

      <router-link to="/">Main</router-link>

      <b-collapse isNav id="nav_collapse">
        <b-nav isNavBar>
          <b-nav-item>
            <router-link to="/component1">Component 1</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/component2">Component 2</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/hello">Hello</router-link>
          </b-nav-item>
        </b-nav>
      </b-collapse>

    </b-navbar>

    <div class="container main">
      <router-view></router-view>
    </div>

  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import "sass/variables";
@import "sass/style";

  .bg-mydoc {
    background-color: #3097D1;
  }

  .main {
    margin-top: $offset-bottom;
  }
</style>
