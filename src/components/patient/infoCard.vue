<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <h6>
                    {{ name }}
                    <small> · <a>Edit</a></small>
                </h6>
            </div>
        </div>
        <div class="card-block">
            <address>
                <div class="row">
                    <div class="col-sm-12">
                        <a class="small" :href="'tel:'+phones">{{ phones }}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 lead">
                        {{ address }}
                    </div>
                </div>
            </address>

            <div class="row">
                <div class="col-sm-12 card-text text-muted">
                    {{ symptoms }}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  export default {
    props: {
      name: {
        type: String,
        default: 'Patient Name'
      },
      phones: {
        type: String,
        default: '+_____________'
      },
      address: {
        type: String,
        default: 'Address'
      },
      symptoms: {
        type: String,
        default: 'Reason of the appointment'
      }
    },
    components: {},
    data () {
      return {}
    }
  }
</script>
