<template>
  <div id="app">
    <loading-bar ref="loadingBar"></loading-bar>

    <div v-if="$auth.ready() && loaded">
      <b-navbar  v-if="$auth.check()" toggleable type="inverse" variant="mydoc" class="sticky-top">

        <b-nav-toggle target="nav_collapse"/>

        <div class="container">
          <router-link to="/" class="navbar-brand">{{ $t("MeDoctor") }}</router-link>

          <b-collapse isNav id="nav_collapse">

            <b-nav isNavBar>
              <router-link to="/component1" class="nav-link">Component 1</router-link>
              <router-link to="/component2" class="nav-link">Component 2</router-link>
              <router-link to="/hello" class="nav-link">Hello</router-link>
            </b-nav>

            <b-nav isNavBar>

              <!-- Navbar dropdowns -->
              <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item to="#">EN</b-dropdown-item>
                <b-dropdown-item to="#">ES</b-dropdown-item>
                <b-dropdown-item to="#">RU</b-dropdown-item>
                <b-dropdown-item to="#">FA</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav>

          </b-collapse>
        </div>
      </b-navbar>

      <div class="container main">
        <router-view></router-view>
      </div>
    </div>

    <div v-if="!$auth.ready() || !loaded">
      <div style="text-align:center; padding-top:50px;">
        Loading site...
        will show loading picture here
      </div>
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
  import Vue from 'vue'
  import LoadingBar from './components/ui/loadingBar.vue'

  const Providers = {
    // These need to be contained in an object because providers are not reactive.
    loadingBarWrapper: {
      ref: null
    },
    // Expose the event bus to all descendants so they can listen for the app-ready event.
    EventBus: new Vue()
  }

  export default {
    data () {
      return {
        loaded: false
      }
    },
    // Allows descendants to inject everything in the Providers object.
    provide: Providers,
    components: {
      LoadingBar
    },
    mounted () {
      let _this = this

      Providers.loadingBarWrapper.ref = this.$refs.loadingBar
      // Emit the app-ready event via the Event Bus
      Providers.EventBus.$emit('app-ready')

      // Set up $auth.ready with other arbitrary loaders (ex: language file).
      setTimeout(function () {
        _this.loaded = true
      }, 500)

      if (!this.$auth.check()) {
        this.$auth.logout()
      }
    },
    methods: {
      logout () {
        this.$auth.logout({
          makeRequest: true,
          success () {
            console.log('success ' + this.context)
          },
          error () {
            console.log('error ' + this.context)
          }
        })
      },
      logoutOther () {
        this.$auth.logoutOther({
          success () {
            console.log('success ' + this.context)
          },
          error () {
            console.log('error ' + this.context)
          }
        })
      }
    }
  }
</script>
