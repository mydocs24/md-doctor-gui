<template>
    <div class="case-details">
        <div class="row">
            <div class="col-sm-12 text-right control-links">
                <a @click="onClose" class="close-link">&times; {{ $t('Close') }}</a>
                <a @click="onSign" class="sign-link" v-if="rowData.status === 'processing'">{{ $t('Sign') }}</a>
                <a @click="onSend" class="send-link" v-if="rowData.status === 'signed'">{{ $t('Send') }}</a>
                <router-link :to="'doctor/accidents/'+rowData.id" class="proceed-link">{{$t('Open')}} &rarr;</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>{{ $t('Referral Number') }}</label>
                <h5 class="case-item">{{rowData.refNum}}</h5>
            </div>
            <div class="col-sm-6">
                <label>{{$t('City')}}</label>
                <p class="case-item">{{rowData.city}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>{{$t('Phone')}}</label>
                <p class="case-item">{{rowData.phone}}</p>
            </div>
            <div class="col-sm-6">
                <label>{{$t('Address')}}</label>
                <p class="case-item">{{rowData.address}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <label>{{$t('Commentary')}}</label>
                <p class="case-item">{{rowData.symptoms}}</p>
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
      this.$events.fire('vuetable:close-row', {id: this.rowData.id}, event)
    },
    onSign () {
      console.log('sign', this.rowData.id)
    },
    onSend () {
      console.log('send', this.rowData.id)
    }
  }
}
</script>
