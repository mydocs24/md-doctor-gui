<template>
    <div>
        <div class="row justify-content-around">
            <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
                <table class="table">
                    <thead>
                    <tr v-on:click="showDocuments()">
                        <th>{{$t('Passport')}}</th>
                        <th><span class="badge badge-default">{{ passports.length }}</span></th>
                    </tr>
                    <tr v-on:click="showDocuments()">
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
                        v-on:imageuploaded="imageUploaded"
                        :headers="{ Authorization: 'Bearer ' + $auth.token() }"
                    ></vue-core-image-upload>
                    <figcaption class="figure-caption text-right text-muted">
                        {{$t("Take a new photo")}}
                    </figcaption>
                </figure>
            </div>
        </div>

        <!-- Modal Component -->
        <b-modal id="documents" :title="$t('Documents')" @shown="onModalShown">
            body
        </b-modal>
    </div>
</template>
<style lang="scss">
</style>
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
        default: 0
      },
      uploadUrl: {
        type: String,
        default: 'upload'
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
            this.loadingBarWrapper.ref.done()
          }
        ).catch(
          err => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get documents'),
              consoleMessage: err.message
            })
            this.loadingBarWrapper.ref.done()
          }
        )
      },

      onModalShown () {
        console.log('modal opened')
      },

      showDocuments () {
        console.log('show docs')
        this.$root.$emit('show::modal', 'documents')
      },

      imageUploaded (res) {
        this.passports.push(res)
        if (res.errcode === 0) {
          this.src = ''
        }
      },

      // return file object
      imagechanged (res) {
        console.log('changed', res.name)
      },

      // uploading image
      imageuploading (res) {
        console.info('uploading')
      }
    }
  }
</script>
