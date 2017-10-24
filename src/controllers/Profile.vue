<template>
    <div class="main">
        <div v-if="doctor" class="card">
            <div class="row">
                <div class="col-sm-5 doctor-info">
                    <div class="card-block">
                        <img class="card-img-top"
                             :src="doctor.picture_url.length ? doctor.pricture_url : '../static/camera.svg'"
                             height="100px"
                             alt="doctor.name">
                        <br>
                        <span class="text-muted">{{ $t('Load photo') }}</span>
                    </div>
                </div>
                <div class="col-sm-7">
                    form editor
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import DoctorProvider from '../providers/doctor.vue'

  export default {
    inject: ['loadingBarWrapper'],
    components: {},
    created: function () {
      this.fetchData()
    },
    data () {
      return {
        doctor: null
      }
    },
    notifications: {
      showGowl: {
        type: 'error'
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
              message: this.$t('Something wrong happened on the server side'),
              consoleMessage: err
            })
            this.loadingBarWrapper.ref.fail()
          }
        )
      }
    }
  }
</script>
