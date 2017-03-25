<template>
    <div v-if="doctor" class="card doctor-info">
        <img class="card-img-top"
             :src="doctor.picture_url"
             height="100px"
             alt="doctor.name">
        <div class="card-block">
            <h6>{{ doctor.name }}</h6>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../sass/variables";
</style>
<script>
  import DoctorProvider from '../../providers/doctor.vue'

  export default {
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
        this.doctor = null
        DoctorProvider.get().then(
          (response) => {
            this.doctor = response.body
          },
          (err) => {
            this.error = err.toString()
            if (err.status === 401) {
              this.errorModal.title = 'Authorization'
              this.errorModal.bodyText = 'You can\'t load list while you are not authorized.'
            } else if (err.status === 0) {
              this.errorModal.title = 'Request Error'
              this.errorModal.bodyText = 'Not a CORS response'
            } else {
              this.errorModal.title = 'Request Error'
              this.errorModal.bodyText = '"' + err.status + '" ' + err.statusText
            }

            this.$refs.errorModal.show()
          }
        )
      },
      onErrorModalClose () {
        this.$refs.errorModal.hide()
      }
    }
  }
</script>
