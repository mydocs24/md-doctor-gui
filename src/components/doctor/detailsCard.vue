<template>
    <div>
        <div v-if="doctor" class="card card-about">
            <div class="card-block">
                <h6>{{ $t('About') }}
                    <small> · <router-link :to="'doctor/profile'">{{ $t('Edit') }}</router-link></small>
                </h6>
                <div class="row">
                    <div class="col-12">
                        <b>{{ $t('City') }}</b>
                        <br><span class="ml-1">{{ doctor.city }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b>{{ $t('Phone') }}</b>
                        <br><span class="ml-1">{{ doctor.phones }}</span>
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
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
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
            this.doctor = response.body
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
          }
        )
      }
    }
  }
</script>
