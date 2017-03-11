<template>
    <div class="row">
        <div class="col-sm-2">
            <div class="card doctor-info">
                <img class="card-img-top"
                     src="https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-9/13007374_971838689558988_8853583067139950859_n.jpg?oh=1ac22b8094c9a93c13c4692c3fa809d0&oe=59300A59"
                     height="100px"
                     alt="doctor.name">
                <div class="card-block">
                    <h6>Alexander Zagovorichev</h6>
                </div>
            </div>

            <div class="card card-about">
                <div class="card-block">
                    <h6>About
                        <small> · <a>Edit</a></small></h6>
                    <b>City</b>
                    <br><span class="val">Tenerife</span>
                    <br><b>Cases 2017</b>
                    <br><span class="val">10</span>
                </div>
            </div>
        </div>
        <div class="col-sm-7">
            <cases-table></cases-table>
        </div>
        <div class="col-sm-3">
            <b-alert :show="true" state="warning" dismissible>
                  This is an alert
            </b-alert>
            messages,another info
            For example:
            Your case was approved and closed
            Your case was payed

            <div class="card card-copy">
                <div class="card-block">
                    @ 2017 MyDoctor <a href="/about">About</a>
                    <a href="/help">Help</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../sass/variables";

    .doctor-info {
        margin-bottom: $offset-bottom;
    }

    .card-copy,
    .card-about {
        font-size: $font-size-sm;
    }

    .card-about {
        .val {
            padding-left: .5rem;
        }
    }
</style>
<script>
import CasesTable from '../components/cases/CasesTable'

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
