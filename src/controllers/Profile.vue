<template>
    <div class="main">
        <div v-if="doctor" class="card">
            <div class="row m-3">
                <div class="col-sm-5 doctor-info">
                    <div class="card-block text-center">
                        <img class="card-img-top"
                             :src="doctor && doctor.hasOwnProperty('picture_url') ? doctor['picture_url'] : '../static/camera.svg'"
                             height="100px"
                             :alt="doctor.name">
                        <br>
                        <!--span class="text-muted">{{ $t('Load photo') }}</span-->
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
      showGrowl: {
        type: 'error'
      }
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        this.doctor = null
        DoctorProvider.get().then(
          (response) => {
            this.loadingBarWrapper.ref.done()
            this.doctor = response.data.data
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
              message: this.$t('Accident saved'),
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
      }
    }
  }
</script>
