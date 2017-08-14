<template>
    <div class="case-details">
        <div class="row">
            <div class="col-sm-12 text-right control-links">
                <a @click="onClose" class="close-link">&times; {{ $t('Close') }}</a>
                <a @click="onSend" class="send-link" v-if="rowData.status === 'in_progress'">{{ $t('Send') }}</a>
                <router-link :to="'doctor/accidents/'+rowData.id" class="proceed-link">{{ $t('Open') }} &rarr;</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>{{ $t('Referral Number') }}</label>
                <h5 class="case-item">{{ rowData.ref_num }}</h5>
            </div>
            <div class="col-sm-6" v-if="rowData.city">
                <label>{{ $t('City') }}</label>
                <p class="case-item">{{ rowData.city }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6" v-if="rowData.phone">
                <label>{{ $t('Phone') }}</label>
                <p class="case-item">{{ rowData.phone }}</p>
            </div>
            <div class="col-sm-6" v-if="rowData.address">
                <label>{{ $t('Address') }}</label>
                <p class="case-item">{{ rowData.address }}</p>
            </div>
        </div>
        <div class="row" v-if="rowData.symptoms">
            <div class="col-sm-12">
                <label>{{$t('Symptoms')}}</label>
                <p class="case-item">{{ rowData.symptoms }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../sass/variables";
    .case-details {
        label {
            color: $gray-light;
            font-size: $font-size-sm;
            font-weight: $font-weight-bold;
        }
        .control-links {
            font-size: $small-font-size;
        }
    }
</style>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    onClose (event) {
      this.$events.fire('vuerow:close', {id: this.rowData.id}, event)
    },
    onSend (event) {
      this.$events.fire('vuerow:send', [this.rowData], event)
    }
  }
}
</script>
