<template>
    <div class="row justify-content-around">
        <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
            <table class="table">
                <thead>
                <tr>
                    <th>{{$t('Passport')}}</th>
                    <th><span class="badge badge-default">{{ passports.length }}</span></th>
                </tr>
                <tr>
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
                    :headers="headers"
                >
                </vue-core-image-upload>
                <figcaption class="figure-caption text-right text-muted">
                    {{$t("Take a new photo")}}
                </figcaption>
            </figure>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import VueCoreImageUpload from '../../components/ui/vue.core.image.upload.vue'
  export default {
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
        passports: [],
        headers: { Authorization: 'Bearer ' + this.$auth.token() }
      }
    },
    methods: {
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
      }
    }
  }
</script>
