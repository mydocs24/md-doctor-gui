<template>
    <div>
        <div v-if="doctor" class="card doctor-info">
            <img class="card-img-top"
                 :src="doctor.picture_url"
                 height="100px"
                 alt="doctor.name">
            <div class="card-block">
                <h6>{{ doctor.name }}</h6>
            </div>
        </div>
    </div>
</template>
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
            this.doctor = response.data
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
