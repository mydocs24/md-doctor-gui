<template>
  <div id="app">
    <b-navbar toggleable type="inverse" variant="mydoc" class="sticky-top">

      <b-nav-toggle target="nav_collapse"/>

      <div class="container">
        <router-link to="/" class="navbar-brand">MeDoctor</router-link>

        <b-collapse isNav id="nav_collapse">
          <b-nav isNavBar>
            <router-link to="/component1" class="nav-link">Component 1</router-link>
            <router-link to="/component2" class="nav-link">Component 2</router-link>
            <router-link to="/hello" class="nav-link">Hello</router-link>
          </b-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <top-progress ref="topProgress"></top-progress>

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

  .navbar-inverse {
    .navbar-nav {
      .nav-link {
        color: rgba(255, 255, 255, 0.5);
        &.router-link-active {
          color: $white;
        }
      }
    }
    .navbar-brand,
    .router-link-active {
      color: $white;
    }
  }
</style>

<script>
  import topProgress from 'vue-top-progress'

  export default {
    components: {
      topProgress
    }
  }
</script>
