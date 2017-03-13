<template>
    <div class="case-details">
        <div class="row">
            <div class="col-sm-12 text-right">
                <a @click="close()" class="close-link">&times; Close</a>
                <a @click="proceed(rowData.id)" class="sign-link">Sign</a>
                <router-link :to="'doctor/accidents/'+rowData.id" class="proceed-link">Open &rarr;</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>Referral</label>
                <h5 class="case-item">{{rowData.refNum}}</h5>
            </div>
            <div class="col-sm-6">
                <label>City</label>
                <p class="case-item">{{rowData.city}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>Phone</label>
                <p class="case-item">{{rowData.phone}}</p>
            </div>
            <div class="col-sm-6">
                <label>Address</label>
                <p class="case-item">{{rowData.address}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <label>Commentary</label>
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
        .case-item {
            padding-left: $offset-bottom;
        }
        .close-link {
            margin-right: $offset-bottom;
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
    close () {
      console.log('my-detail-row: on-click event')
    },
    proceed (id) {
      console.log(id)
    }
  }
}
</script>
