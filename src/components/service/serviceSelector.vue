<template>
    <div>
        <v-select
                :clearSearchOnSelect="true"
                :value.sync="selected"
                :options="options"
                :on-change="onChange"
                label="title"
                :placeholder="$t('Services')"
        ></v-select>
        <http-error-component ref="serviceError"></http-error-component>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import vSelect from 'vue-select'
  import HttpErrorComponent from '../../components/ui/http/error.vue'
  import ServiceProvider from '../../providers/service.vue'

  export default {
    components: {
      vSelect,
      HttpErrorComponent
    },
    data () {
      return {
        selected: null,
        options: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        ServiceProvider.get().then(
          (response) => {
            this.options = response.body.data
          },
          (err) => {
            this.$refs.serviceError.error(err)
          }
        )
      },
      onChange (service) {
        this.$events.fire('selector:change', service, event)
      }
    }
  }
</script>
