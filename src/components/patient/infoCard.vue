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
                        <a class="small" v-for="phone in patient.phones" :href="'tel:' + phone">{{ phone }}</a>
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
                    {{ patient.symptoms }}
                </div>
            </div>
        </div>

        <top-progress-v ref="pic" color="orange"></top-progress-v>
    </div>
</template>
<script>
  import AccidentProvider from '../../providers/accident.vue'
  import HttpErrorComponent from '../../components/ui/http/error.vue'
  import TopProgressV from 'vue-top-progress'

  export default {
    components: {
      TopProgressV
    },
    mounted: function () {
      this.$refs.pic.start()
      this.fetchData()
    },
    data () {
      return {
        patient: null
      }
    },
    methods: {
      fetchData () {
        this.$refs.topProgressInfoCard.start()
        AccidentProvider.getPatient().then(
          (response) => {
            this.patient = response.body
            this.$refs.topProgressInfoCard.done()
          },
          (err) => {
            HttpErrorComponent.error(err)
            this.$refs.topProgressInfoCard.fail()
          }
        )
      },
      onEdit () {
        this.$emit('on-edit')
      }
    }
  }
</script>
