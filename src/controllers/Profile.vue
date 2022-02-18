<template>
    <div class="main">
        <div v-if="doctor" class="card">
            <div class="row m-3">
                <div class="col-sm-5 doctor-info">
                    <div class="card-block text-center">
                      <figure class="figure w-100">

                        <img v-if="showAvatar" :src="doctor.thumb200" :alt="doctor.name" class="img-thumbnail" />

                        <vue-core-image-upload
                          v-if="showUploader"
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
                        <figcaption class="figure-caption text-left text-muted" v-if="hasAvatar">
                          <button
                            v-if="showUploader"
                            @click="showUploader = false; showAvatar = true"
                            class="btn btn-link"
                          >{{ $t("Cancel") }}</button>
                          <button
                            v-if="!showUploader"
                            @click="showUploader = true; showAvatar=false"
                            class="btn btn-link"
                          >{{ $t("Replace avatar") }}</button>
                        </figcaption>
                      </figure>
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="row mb-2">
                      <div class="col-9">
                        <label class="label">{{ $t("Name") }}</label>
                        <input type="text" class="form-control" v-model="doctor.name">
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-9">
                        <label class="label">{{ $t("Phone") }}</label>
                        <input type="text" class="form-control" v-model="doctor.phones">
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-9">
                        <b>{{ $t("Medical Board Number") }}</b>
                        {{ doctor.medical_board_num }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-9">
                        <button class="btn btn-success" @click="doSave()">{{ $t("Save") }}</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import DoctorProvider from '../providers/doctor.vue'
  import VueCoreImageUpload from '../components/ui/vue.core.image.upload.vue'
  import axios from 'axios'

  export default {
    inject: ['loadingBarWrapper'],
    components: {
      VueCoreImageUpload
    },
    created: function () {
      this.fetchData()
    },
    data () {
      return {
        doctor: null,
        uploadUrl: '',
        avatar: null,
        showUploader: false,
        showAvatar: false,
        hasAvatar: false
      }
    },
    notifications: {
      showGrowl: {
        type: 'error'
      }
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        this.uploadUrl = axios.defaults.baseURL + '/' + DoctorProvider.getUrl() + '/photo'
        this.doctor = null
        DoctorProvider.get().then(
          (response) => {
            this.loadingBarWrapper.ref.done()
            this.doctor = response.data.data
            const ava = this.doctor.thumb200
            if (ava.length) {
              this.showAvatar = true
              this.showUploader = false
              this.hasAvatar = true
            } else {
              this.showAvatar = false
              this.showUploader = true
              this.hasAvatar = false
            }
          },
          (err) => {
            this.loadingBarWrapper.ref.fail()
            this.showGowl({
              title: this.$t('Loading Error'),
              message: this.$t('Something wrong happened on the server side'),
              consoleMessage: err
            })
          }
        )
      },
      doSave () {
        this.loadingBarWrapper.ref.start()
        DoctorProvider.save(this.doctor).then(
          () => {
            this.loadingBarWrapper.ref.done()
            this.showGrowl({
              title: this.$t('Success'),
              message: this.$t('Saved'),
              type: 'success'
            })
          }
        ).catch(
          err => {
            this.loadingBarWrapper.ref.done()
            this.showGrowl({
              title: this.$t('API Error'),
              message: this.$t('Can\'t save profile'),
              consoleMessage: err.message,
              type: 'error'
            })
          }
        )
      },
      imageUploaded (res) {
        this.doctor = res && res.hasOwnProperty('data') ? res['data'] : ''
        this.showUploader = false
        this.showAvatar = true
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
