<template>
    <div class="row">
        <div class="col-sm-2">
            doc info
            For example:
            Photo
            Name of Doctor
            City: Tenerife
            Closed Cases for season 2017: 10
        </div>
        <div class="col-sm-7">
            <cases-table></cases-table>
        </div>
        <div class="col-sm-3">
            <b-alert :show="true" state="success" dismissible>
                  This is an alert
            </b-alert>
            messages,another info
            For example:
            Your case was approved and closed
            Your case was payed

            <div class="card">
                <div class="card-block">
                    @ 2017 MyDoctor
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
import CasesTable from './cases/CasesTable'

export default {

  data () {
    return {
      countActive: 10
    }
  },
  components: {
    CasesTable
  }
}

</script>
