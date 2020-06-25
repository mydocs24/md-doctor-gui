<template>
    <div class="login-container">
        <div class="login-content">
            <form v-on:submit.prevent="login()" class="login-form">
                <div class="row mb-4">
                    <div class="col-sm-3 text-right">
                        <img src="../../static/doctor_72.png" height="32" :alt="$t('Doctor')">
                    </div>
                    <div class="col-sm-9 text-left">
                        <h3 class="text-muted mb-4 login-title">{{ $t('Doctor\'s office') }}</h3>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-2">
                        <label class="control-label">{{ $t('E-Mail') }}</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :placeholder="$t('E-Mail')" v-model="data.body.email">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-2">
                        <label class="control-label label">{{ $t('Password') }}</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" :placeholder="$t('Password')" v-model="data.body.password">
                    </div>
                </div>

                <div class="mb-5">
                    <button
                            type="submit"
                            class="btn btn-info"
                            :disabled="!valid()"
                    >{{ $t('Log In') }}</button>
                </div>

                <hr class="mb-5">

                <footer class="login-footer">
                    &copy; {{ new Date().getFullYear() }} {{ $t('MyDoctors24') }}
                    <img class="ml-3" width="120" src="../../static/mc_240.png" :alt="$t('Medical Company')">
                </footer>
            </form>
        </div>
    </div>
</template>
<style type="scss">

    .login-footer {
        color: #636c72 !important;
        font-size: 1.1em;
        font-weight: bolder;
    }

    .login-container {
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        display: table;
        width: 100%;
        height: 100vh;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        padding-right: 15px;
        padding-left: 15px;
    }

    .login-content {
        display: table-cell;
        vertical-align: middle;
    }

    .login-form {
        margin-top: -60px;
        text-align: center !important;
        margin-right: auto !important;
        margin-left: auto !important;
        width: 540px;
        border-radius: 5px;
    }

    @media (min-width: 576px) {
        .login-container {
            padding-right: 15px;
            padding-left: 15px;
        }
    }

    @media (min-width: 768px) {
        .login-container {
            padding-right: 15px;
            padding-left: 15px;
        }
    }

    @media (min-width: 992px) {
        .login-container {
            padding-right: 15px;
            padding-left: 15px;
        }
    }

    @media (min-width: 1200px) {
        .login-container {
            padding-right: 15px;
            padding-left: 15px;
        }
    }

    .enter-btn {
        color: #fff;
        background-color: #3097D1;
        display: inline-block;
        font-weight: normal;
        line-height: 1.25;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px #3097D1 solid;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }
</style>
<script>
  export default {
    data () {
      return {
        context: 'login context',
        data: {
          body: {
            email: 'doctor@mail.com',
            password: 'secret'
          },
          rememberMe: false,
          fetchUser: true
        },
        error: {
          title: ''
        }
      }
    },
    mounted () {
      /* console.log(this.$auth.redirect()) */
      // Can set query parameter here for auth redirect or just do it silently in login redirect.
      // this.error.title = 'titi'
    },
    notifications: {
      showLoginError: {
        title: '',
        message: '',
        type: 'error', // Default: 'info', also you can use VueNotifications.type.error instead of 'error'
        consoleMessage: 'let it be in console'
      }
    },
    methods: {
      valid () {
        return this.data.body.password.length > 4 && this.data.body.email.length > 5
      },
      login () {
        // let redirect = this.$auth.redirect()
        this.$auth.login({
          data: this.data.body,
          rememberMe: this.data.rememberMe,
          // redirect: {name: redirect ? redirect.from.name : 'account'},
          fetchUser: this.data.fetchUser,
          success (res) {
            localStorage.setItem('lang', res.data.lang)
            this.$i18n.locale = res.data.lang
          },
          error (res) {
            this.showLoginError({
              title: this.$t('Login Failed'),
              message: this.$t('Failed to authenticate'),
              consoleMessage: 'Failed authentication ' + res
            })
            this.error = res.data
          }
        })
      }
    }
  }
</script>
