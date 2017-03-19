<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-lg-9 mx-auto">
                <top-progress ref="topProgress" color="orange"></top-progress>
                <ol class="breadcrumb">
                    <li v-for="item in items" :class="['breadcrumb-item', item.active ? 'active' : null]">
                        <router-link :to="item.link"
                             v-if="!item.active"
                             v-html="item.text"
                        ></router-link>

                        <b v-if="item.active" v-html="item.text" />
                    </li>
                </ol>

                <div class="row">
                    <div class="col-sm-8 col-md-7 col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">
                                    <h6>Foster Abigail
                                        <small> · <a>Edit</a></small>
                                    </h6>
                                </div>
                            </div>
                            <div class="card-block">
                                <address>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <a class="small" href="tel:+375255283638">+375255283638</a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 lead">
                                            Benidorm, Adolfa Uzuarez 162/4, 52
                                        </div>
                                    </div>
                                </address>

                                <div class="row">
                                    <div class="col-sm-12 card-text text-muted">
                                        Reason of the call. Call from the Assisstant company AXA. Patient with some ill
                                        want to
                                        get medical appointment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-lg-5 col-lg-6">
                        <div class="text-success text-right">First appointment</div>
                        <div class="row justify-content-around">
                            <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Passport</th>
                                        <th><span class="badge badge-default">0</span></th>
                                    </tr>
                                    <tr>
                                        <th>Insurance</th>
                                        <th><span class="badge badge-success">0</span></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="col-6 col-sm-12 col-lg-6">
                                <figure class="figure w-100">
                                    <vue-core-image-upload
                                            v-bind:class="['pure-button','pure-button-primary','js-btn-crop']"
                                            v-bind:crop="true"
                                            cropRatio="2:1"
                                            text="Take a photo of the passport"
                                            url="./crop.php"
                                            extensions="png,gif,jpeg,jpg"
                                            v-on:imageuploaded="imageUploaded">
                                    </vue-core-image-upload>
                                    <figcaption class="figure-caption text-right text-muted">
                                        Take a new photo
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-11 col-sm-10 mx-auto">
                                <form class="form">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-7">
                                                <label class="form-control-label" for="service">Select services</label>
                                                <select name="services[]" id="service" class="form-control">
                                                    <option value="1">Service selection</option>
                                                </select>
                                                <div class="text-right">
                                                    <a>+ Add new Service</a>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="form-control-label" for="case">Case Type</label>
                                                <select name="case" id="case" class="form-control">
                                                    <option value="">Case 1</option>
                                                    <option value="">Case 2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-7">
                                                <label for="survey" class="col-form-label">Survey</label>
                                                <select name="survey" id="survey" class="form-control">
                                                    <option value="1">Survey 1</option>
                                                    <option value="1">Survey 2</option>
                                                    <option value="1">Survey 3</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-5">
                                                <div class="mt-sm-5 text-right">
                                                    <a>+ Add survey</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-12 mx-auto">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label for="diagnostic" class="form-control-label">Diagnostic</label>
                                                    </div>
                                                    <div class="col-8 text-right">
                                                        <a>Additional investigation</a>
                                                    </div>
                                                </div>
                                                <textarea class="form-control" name="diagnostic" id="diagnostic"
                                                          rows="10"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row mt-4">
                                            <div class="col-sm-8 mx-auto">
                                                <div class="total">
                                                    Total: 2000 &euro;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6 text-center">
                                <button class="btn btn-lg btn-warning">Reject</button>
                            </div>
                            <div class="col-6 text-center">
                                <button class="btn btn-lg btn-success">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <p class="mb-3 mt-2 text-center">
                        &copy; 2017 <a href="">MyDoctor24.com</a>
                    </p>
                </footer>
            </div>
        </div>

        <b-modal ref="errorModal" size="sm">
            <h4 slot="modal-header">{{ errorModal.title }}</h4>
            <div slot="modal-body">{{ errorModal.bodyText }}</div>
            <span slot="modal-footer">
                <button class="btn btn-danger" @click="onErrorModalClose()">Close</button>
            </span>
        </b-modal>

    </div>
</template>

<style lang="scss">
    @import "../sass/variables";
</style>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  import VueCoreImageUpload from '../components/ui/vue.core.image.upload.vue'
  import topProgress from 'vue-top-progress'

  export default {
    data () {
      return {
        errorModal: {
          title: '',
          bodyText: ''
        },
        src: '',
        accident: null,
        items: [{
          text: 'Main',
          link: '/doctor'
        }, {
          text: 'Accident #',
          active: true
        }],
        httpOptions: {
          type: Object,
          default: function () {
            return {}
          }
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      this.$refs.topProgress.error = false
      this.$refs.topProgress.start()
      Vue.http.get(to.params.id, {}).then(
        (accident) => {
          this.$refs.topProgress.done()
          next(vm => {
            vm.accident = accident
          })
        },
        (err) => {
          this.$refs.topProgress.error = 1

          console.log(err)
          if (err.status === 401) {
            this.errorModal.title = 'Authorization'
            this.errorModal.bodyText = 'You can\'t load list while you are not authorized.'
          } else if (err.status === 0) {
            this.errorModal.title = 'Request Error'
            this.errorModal.bodyText = 'Not a CORS response'
          } else {
            this.errorModal.title = 'Request Error'
            this.errorModal.bodyText = '"' + err.status + '" ' + err.statusText
            console.log(err.status, err.statusText)
          }

          this.$refs.errorModal.show()
          next(false)
        }
      )
    },
    watch: {
      $route () {
        this.accident = null
        Vue.http.get(this.$route.params.id, this.httpOptions).then(
          (accident) => {
            this.accident = accident
          },
          (err) => {
            this.error = err.toString()
            console.log(err)
          }
        )
      }
    },
    methods: {
      onErrorModalClose () {
        this.$refs.errorModal.hide()
      },
      imageUploaded (res) {
        console.log(res)
        if (res.errcode === 0) {
          this.src = ''
        }
      },

      // return file object
      imagechanged (res) {
        console.log(res.name)
      },

      // uploading image
      imageuploading (res) {
        console.info('uploading')
      },

      // handle some error like ajax not working
      errorhandle (err) {
        console.error(err)
      },

      onLink (item) {
        console.log(item)
      }
    },
    components: {
      VueCoreImageUpload,
      topProgress
    }
  }
</script>
