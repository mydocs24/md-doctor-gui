<template>
    <div>
        <div v-if="doctor" class="card card-about">
            <div class="card-block m-2">
                <h6>{{ $t('About') }}
                    <small> · <router-link :to="'doctor/profile'">{{ $t('Edit') }}</router-link></small>
                </h6>
                <div class="row">
                    <div class="col-12">
                        <b>{{ $t('City') }}</b>
                        <br><span class="ml-1">{{ doctor.city ? doctor.city : $t('Not set') }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b>{{ $t('Phone') }}</b>
                        <br><span class="ml-1">{{ doctor.phones ? doctor.phones : $t('Not set') }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b :title="$t('Medical Board Number')">{{ $t('MBN') }}</b>
                        <br><span class="ml-1">{{ doctor.mbn ? doctor.mbn : $t('Not set') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../sass/variables";
    .card-about {
        font-size: $font-size-sm;
        .val {
            padding-left: .5rem;
        }
    }
</style>
<script>
  import DoctorProvider from '../../providers/doctor.vue'

  export default {
    inject: ['loadingBarWrapper'],
    notifications: {
      showGowl: {
        type: 'error'
      }
    },
    created: function () {
      this.fetchData()
    },
    data () {
      return {
        doctor: null
      }
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        this.doctor = null
        DoctorProvider.get().then(
          (response) => {
            this.doctor = response.data.data
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showGowl({
              title: this.$t('Loading Error'),
              message: this.$t('Server error'),
              consoleMessage: err
            })
            this.loadingBarWrapper.ref.fail()
          }
        )
      }
    }
  }
</script>
