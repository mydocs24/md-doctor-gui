<template>
    <div v-if="patient" class="card">
        <div class="card-header">
            <div class="card-title">
                <h6>
                    {{ patient.name }}
                    <small> · <a @click="onEdit()">{{ $t('Edit') }}</a></small>
                </h6>
            </div>
        </div>
        <div class="card-block">
            <address>
                <div class="row">
                    <div class="col-sm-12">
                        <a class="small" v-for="phone in patient.phones" :href="'tel:' + phone.tel">{{ phone.tel }}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 lead">
                        {{ patient.address }}
                    </div>
                </div>
            </address>

            <div class="row">
                <div class="col-sm-12 card-text text-muted">
                    {{ patient.reason }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import AccidentProvider from '../../providers/accident.vue'

  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    created: function () {
      this.fetchData()
    },
    props: {
      doctorCaseId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        patient: null
      }
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.getPatient(this.doctorCaseId).then(
          (response) => {
            this.patient = response.body
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
          }
        )
      },
      reload () {
        this.fetchData()
      },
      onEdit () {
        this.$emit('on-edit')
      }
    }
  }
</script>
