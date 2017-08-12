<template>
    <div>
        <div class="row justify-content-around">
            <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
                <table class="table">
                    <thead>
                    <tr v-on:click="showDocuments('passport')">
                        <th>{{$t('Passport')}}</th>
                        <th><span class="badge badge-default">{{ passports.length }}</span></th>
                    </tr>
                    <tr v-on:click="showDocuments('insurance')">
                        <th>{{$t('Insurance')}}</th>
                        <th><span class="badge badge-success">{{ insurances.length }}</span></th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="col-6 col-sm-12 col-lg-6">
                <figure class="figure w-100">
                    <vue-core-image-upload
                        v-bind:classes="['pure-button','pure-button-primary','js-btn-crop']"
                        v-bind:crop="false"
                        :text="$t('Take a photo')"
                        :url="uploadUrl"
                        extensions="png,gif,jpeg,jpg"
                        @imageuploaded="imageUploaded"
                        @imageuploading="imageUploading"
                        @errorhandle="uploadError"
                        :headers="{ Authorization: 'Bearer ' + $auth.token() }"
                    ></vue-core-image-upload>
                    <figcaption class="figure-caption text-right text-muted">
                        {{$t("Take a new photo")}}
                    </figcaption>
                </figure>
            </div>
        </div>

        <!-- Modal Component -->
        <b-modal id="documents" :title="$t('Documents')" @shown="onModalShown" size="lg">
            <div v-if="!passports.length && !insurances.length">{{ $t('This patient has no documents. You need to load them firstly.') }}</div>

            <div v-if="passports.length" class="row">
                <div class="col-sm-6 mb-3" v-for="passport in passports">
                    <div class="card">
                        <img class="card-img-top" :src="passport.url" :alt="passport.title">
                        <div class="card-block">
                            <h5 class="card-title">{{ $t('Passport') }}</h5>
                            <p class="card-text">{{ passport.title }}</p>
                            <a href="#" class="btn btn-info" @click="onView(passport)">{{ $t('View') }}</a>
                            <a href="#" class="btn btn-danger" @click="onDelete(passport)">{{ $t('Delete') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
  import VueCoreImageUpload from '../../components/ui/vue.core.image.upload.vue'
  import AccidentProvider from '../../providers/accident.vue'

  export default {
    inject: ['loadingBarWrapper'],
    components: {
      VueCoreImageUpload
    },
    props: {
      id: {
        type: Number,
        'default': 0
      },
      uploadUrl: {
        type: String,
        'default': 'upload'
      }
    },
    data () {
      return {
        insurances: [],
        passports: []
      }
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.getDocuments(this.id).then(
          response => {
            this.passports = response.data.data
            console.log(this.passports)
            this.loadingBarWrapper.ref.done()
          }
        ).catch(
          err => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can not get documents'),
              consoleMessage: err.message
            })
            this.loadingBarWrapper.ref.fail()
          }
        )
      },

      onModalShown () {
        console.log('modal opened')
      },

      showDocuments (mode) {
        this.documentsMode = mode
        this.$root.$emit('show::modal', 'documents')
      },

      imageUploaded (res) {
        this.passports.push(res)
        if (res.errcode === 0) {
          this.src = ''
        }

        this.loadingBarWrapper.ref.done()
      },

      // uploading image
      imageUploading (res) {
        this.loadingBarWrapper.ref.start()
      },

      uploadError (error) {
        this.showHttpError({
          title: this.$t('API Error'),
          message: this.$t('Error on image uploading'),
          consoleMessage: error
        })
        this.loadingBarWrapper.ref.fail()
      }
    }
  }
</script>
