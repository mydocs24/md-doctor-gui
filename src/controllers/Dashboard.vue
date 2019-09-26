<template>
    <div class="main">
        <div class="row">
            <div class="col-lg-2 hidden-md-down">
                <div class="row">
                    <div class="col-6 col-sm-12 mb-3">
                        <doctor-info-card></doctor-info-card>
                    </div>
                    <div class="col-6 col-sm-12">
                        <doctor-details-card></doctor-details-card>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 col-lg-7 col-lg-7 flex-xs-last">
                <cases-table></cases-table>
            </div>
            <div class="col-sm-4 col-lg-3">
                <!--<alerts-list></alerts-list>-->
                <copyright-card></copyright-card>
            </div>
        </div>
    </div>
</template>
<script>
  import DoctorInfoCard from '../components/doctor/infoCard.vue'
  import DoctorDetailsCard from '../components/doctor/detailsCard.vue'
  import CasesTable from '../components/cases/CasesTable'
  import CopyrightCard from '../components/layout/copyrightCard.vue'
  import AlertsList from '../components/layout/alerts.vue'

  export default {
    components: {
      DoctorInfoCard,
      DoctorDetailsCard,
      CasesTable,
      CopyrightCard,
      AlertsList
    },
    data () {
      return {
        countActive: 10,
        caseUrl: false
      }
    },
    methods: {
    }
  }
</script>
