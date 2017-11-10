<template>
    <div>
        <h4 class="text-muted">{{ $t('Documents') }}</h4>
        <div class="row justify-content-around">
            <div class="col-6 col-sm-12 col-lg-6 flex-lg-last">
                <table class="table">
                    <thead>
                    <tr v-on:click="showDocuments('passport')">
                        <th>{{$t('Passport')}}</th>
                        <th><span class="badge badge-warning">{{ passports.length }}</span></th>
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
        <b-modal id="documents" :title="$t('Documents')" @shown="onModalShown" size="lg" :okOnly="true" :okTitle="$t('Close')">
            <div v-if="!passports.length && !insurances.length">{{ $t('This patient has no documents. You need to load them firstly.') }}</div>
            <div class="row">
                <div class="col-sm-6 mb-3" v-if="passports.length" v-for="passport in passports">
                    <div class="card card-blue">
                        <img class="card-img-top" :src="'data:image/jpg;base64, ' + passport.b64thumb" :alt="passport.title">
                        <div class="card-block">
                            <h6 class="card-title m-1 text-info">{{ $t('Passport') }} <small class="link" @click="moveTo(passport, 'insurance')">&rarr; {{ $t('Mark as insurance') }}</small> </h6>
                            <p class="card-text m-1">{{ passport.title }}</p>
                            <div class="row m-1">
                                <button
                                        v-if="passport.owner === 'doctor'"
                                        class="btn btn-danger btn-sm float-right"
                                        @click="shouldShowDeleteConfirm(passport, true)"
                                >{{ $t('Delete') }}</button>

                                <span v-if="shouldShowDeleteConfirm(passport)">
                                    <span class="pl-2 text-muted">{{ $t('Are you sure?') }}</span>
                                    <button class="ml-1 btn-sm btn btn-info" @click="onDocumentDelete(passport)">{{ $t('Yes') }}</button>
                                    <button @click="shouldShowDeleteConfirm(passport, false)"
                                            class="ml-1 btn-sm btn">{{ $t('No') }}</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 mb-3" v-if="insurances.length" v-for="insurance in insurances">
                    <div class="card card-orange">
                        <img class="card-img-top" :src="'data:image/jpg;base64, ' + insurance.b64thumb" :alt="insurance.title">
                        <div class="card-block">
                            <h6 class="card-title m-1 text-warning">{{ $t('Insurance') }} <small class="link" @click="moveTo(insurance, 'passport')">&rarr; {{ $t('Mark as passport') }}</small> </h6>
                            <p class="card-text m-1">{{ insurance.title }}</p>
                            <div class="row m-1">
                                <button
                                        v-if="insurance.owner === 'doctor'"
                                        class="btn btn-danger btn-sm float-right"
                                        @click="shouldShowDeleteConfirm(insurance, true)"
                                >{{ $t('Delete') }}</button>

                                <span v-if="shouldShowDeleteConfirm(insurance)">
                                    <span class="pl-2 text-muted">{{ $t('Are you sure?') }}</span>
                                    <button class="ml-1 btn-sm btn btn-info" @click="onDocumentDelete(insurance)">{{ $t('Yes') }}</button>
                                    <button @click="shouldShowDeleteConfirm(insurance, false)"
                                            class="ml-1 btn-sm btn">{{ $t('No') }}</button>
                                </span>
                            </div>
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
  import DocumentProvider from '../../providers/document.vue'

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
        passports: [],
        shouldShowDeleteConfirmation: []
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
            const data = response.data && response.data.data ? response.data.data : []
            this.passports = []
            this.insurances = []
            if (data.length) {
              this.passports = data.filter((val) => val.type === 'passport')
              this.insurances = data.filter((val) => val.type === 'insurance')
            }
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

      onModalShown () {},

      showDocuments (mode) {
        this.documentsMode = mode
        this.$root.$emit('show::modal', 'documents')
      },

      imageUploaded (res) {
        this.passports.push(res.data)
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
      },

      moveTo (document, type) {
        this.loadingBarWrapper.ref.start()
        document.type = type
        DocumentProvider.moveDocument(document.id, document)
          .then(() => {
            // look into opposite and delete from there
            // look in the type and add into if no there
            if (type === 'insurance') {
              this.passports = this.passports.filter((val) => val.id !== document.id)
              const inInsurance = this.insurances.filter((val) => val.id === document.id)
              if (!inInsurance.length) {
                this.insurances.push(document)
              }
            } else {
              // then type is insurance
              this.insurances = this.insurances.filter((val) => val.id !== document.id)
              const inPassports = this.passports.filter((val) => val.id === document.id)
              if (!inPassports.length) {
                this.passports.push(document)
              }
            }
            this.loadingBarWrapper.ref.done()
          })
          .catch(error => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Document has not been moved'),
              consoleMessage: error
            })
            this.loadingBarWrapper.ref.fail()
          })
      },

      onDocumentDelete (document) {
        this.loadingBarWrapper.ref.start()
        DocumentProvider.deleteDocument(document.id)
          .then(() => {
            this.passports = this.passports.filter(val => val.id !== document.id)
            this.insurances = this.insurances.filter(val => val.id !== document.id)
            this.loadingBarWrapper.ref.done()
          })
          .catch(error => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Document has not been moved'),
              consoleMessage: error
            })
            this.loadingBarWrapper.ref.fail()
          })
      },

      shouldShowDeleteConfirm (document, status) {
        const buff = this.shouldShowDeleteConfirmation.find(val => val.id === document.id)
        if (status === true && !buff) {
          this.shouldShowDeleteConfirmation.push(document)
        }

        if (status === false && buff) {
          this.shouldShowDeleteConfirmation = this.shouldShowDeleteConfirmation.filter(val => val.id !== document.id)
        }

        if (status !== false && status !== true) {
          status = !!buff
        }

        return status
      }
    }
  }
</script>
