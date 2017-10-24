<template>
  <div id="app">
    <loading-bar ref="loadingBar"></loading-bar>

    <div v-if="$auth.ready() && loaded">
      <b-navbar v-if="$auth.check()" toggleable="md" type="inverse" variant="mydoc" :sticky="true">

        <div class="container">
          <b-nav-toggle target="nav_collapse" class="text-white">&darr;</b-nav-toggle>

          <router-link to="/" class="navbar-brand">{{ $t("MeDoctor") }}</router-link>

          <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
              <router-link to="/statistics" class="nav-link">{{ $t('Statistics') }}</router-link>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">

              <!-- Navbar dropdowns -->
              <b-nav-item-dropdown :text="$t('Lang')" right>
                <b-dropdown-item @click="setLang('en')">EN</b-dropdown-item>
                <b-dropdown-item @click="setLang('ru')">RU</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown right>
                <!-- Using text slot -->
                <template slot="text">
                  <span style="font-weight: bold;">{{ $auth.user().email }}</span>
                </template>

                <b-dropdown-item to="/profile">{{ $t('Profile') }}</b-dropdown-item>
                <b-dropdown-item v-if="$auth.check()" v-on:click="$auth.logout()">{{ $t('Logout') }}</b-dropdown-item>
              </b-nav-item-dropdown>

            </b-nav>
          </b-collapse>
        </div>
      </b-navbar>

      <div class="container">
        <router-view></router-view>
      </div>
    </div>

    <div v-if="!$auth.ready() || !loaded">
      <div class="site-loader">
        <img src="../static/mc_240.png" width="240" height="240" :alt="$t('Medical Company')">
        <div class="loader-text">
          {{ $t('Please wait, loading...') }}
        </div>

        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
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
  import LoadingBar from '@/components/ui/loadingBar.vue'
  import DoctorProvider from '@/providers/doctor.vue'

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
        loaded: false,
        user: null
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

      this.initLang()

      // Set up $auth.ready with other arbitrary loaders (ex: language file).
      setTimeout(function () {
        _this.loaded = true
      }, 500)
    },
    methods: {
      initLang () {
        if (localStorage.getItem('lang')) {
          this.$i18n.locale = localStorage.getItem('lang')
        } else {
          const lng = navigator.language || navigator.userLanguage
          this.$i18n.locale = lng.substr(0, 2)
        }
      },
      setLang (loc) {
        this.$i18n.locale = loc
        Providers.loadingBarWrapper.ref.start()
        DoctorProvider.lang(loc)
          .then(() => {
            Providers.loadingBarWrapper.ref.done()
            this.$i18n.locale = loc
            localStorage.setItem('lang', loc)
          })
          .catch(() => Providers.loadingBarWrapper.ref.fail())
      },
      logout () {
        this.$auth.logout({
          makeRequest: true,
          success () {
            localStorage.clear()
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
