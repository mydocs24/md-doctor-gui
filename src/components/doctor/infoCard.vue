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
        <feedback ref="feedback"></feedback>
    </div>
</template>
<script>
  import DoctorProvider from '../../providers/doctor.vue'
  import Feedback from '../../components/ui/dialog/feedback.vue'

  export default {
    components: {
      Feedback
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
        this.doctor = null
        DoctorProvider.get().then(
          (response) => {
            this.doctor = response.body
          },
          (err) => {
            let title
            let text
            if (err.status === 401) {
              title = 'Authorization'
              text = 'You can\'t load list while you are not authorized.'
            } else if (err.status === 0) {
              title = 'Request Error'
              text = 'Not a CORS response'
            } else {
              title = 'Request Error'
              text = '"' + err.status + '" ' + err.statusText
            }

            this.$refs.feedback.show(title, text)
          }
        )
      }
    }
  }
</script>
