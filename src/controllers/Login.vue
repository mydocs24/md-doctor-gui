<template>
    <div class="login-container">
        <div class="login-content">
            <form v-on:submit.prevent="login()" class="login-form">
                <a href="#main" class="login-brand">{{ $t('MyDoctors24.com') }}</a>

                <div class="login-email">
                    <input type="text" class="form-control" placeholder="E-Mail" v-model="data.body.email">
                </div>

                <div class="login-email">
                    <input type="password" class="form-control" placeholder="Password" v-model="data.body.password">
                </div>

                <div class="login-buttons">
                    <button
                            type="submit"
                            class="btn btn-info"
                            :disabled="!valid()"
                    >{{ $t('Log In') }}</button>
                </div>

                <footer class="login-footer">
                    <a href="#forgot">{{ $t('Forgot Password') }}</a>
                </footer>
            </form>
        </div>
    </div>
</template>
<style type="scss">
    .login-footer > a {
        color: #636c72 !important;
        &:hover {
            color: #4b5257 !important;
        }
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

    .login-content {
        display: table-cell;
        vertical-align: middle;
    }

    .login-form {
        max-width: 280px;
        margin-top: -60px;
        text-align: center !important;
        margin-right: auto !important;
        margin-left: auto !important;
    }

    .login-brand {
        width: 40%;
        display: inline-block;
        margin-bottom: 3rem !important;
    }

    .login-email {
        margin-bottom: 1rem;
    }

    .login-buttons {
        margin-bottom: 3rem;
    }

    .enter-btn {
        color: #fff;
        background-color: #3097D1;
        border-color: #3097D1;
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
        border: 1px solid transparent;
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
            // console.log('success 2 ' + this.context)
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
