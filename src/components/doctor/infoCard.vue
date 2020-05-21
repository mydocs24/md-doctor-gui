<template>
    <div>
        <div v-if="doctor" class="card doctor-info">
            <img class="card-img-top"
                 :src="doctor && doctor.hasOwnProperty('picture_url') ? doctor.pricture_url : './static/camera.svg'"
                 height="100px"
                 alt="doctor.name">
            <div class="card-block m-2">
                <h6>{{ doctor.name }}</h6>
            </div>
        </div>
    </div>
</template>
<script>
  import DoctorProvider from '../../providers/doctor.vue'

  export default {
    inject: ['loadingBarWrapper'],
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
