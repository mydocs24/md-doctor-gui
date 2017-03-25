<template>
    <div class="card card-about">
        <div class="card-block">
            <h6>About
                <small> · <a>Edit</a></small>
            </h6>
            <b>City</b>
            <br><span class="val">Tenerife</span>
            <br><b>Cases 2017</b>
            <br><span class="val">10</span>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../sass/variables";
    .card-about {
        font-size: $font-size-sm;
        .val {
            padding-left: .5rem;
        }
    }
</style>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
