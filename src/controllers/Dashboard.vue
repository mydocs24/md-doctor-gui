<template>
    <div class="row">
        <div class="col-sm-9">
            <h1>My Cases</h1>
            <cases-table></cases-table>
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
