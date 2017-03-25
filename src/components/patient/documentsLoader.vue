<template>
    <div class="row justify-content-around">
        <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
            <table class="table">
                <thead>
                <tr>
                    <th>Passport</th>
                    <th><span class="badge badge-default">{{ passports.length }}</span></th>
                </tr>
                <tr>
                    <th>Insurance</th>
                    <th><span class="badge badge-success">{{ insurances.length }}</span></th>
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
                        text="Take a photo"
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
</template>
<style lang="scss">
</style>
<script>
  import VueCoreImageUpload from '../../components/ui/vue.core.image.upload.vue'
  export default {
    components: {
      VueCoreImageUpload
    },
    params: {
      id: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        insurances: [],
        passports: []
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
