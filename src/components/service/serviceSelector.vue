<template>
    <div>
        <v-select
                :clearSearchOnSelect="true"
                :debounce="250"
                :on-search="onSearch"
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
    property: {
      excluded: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        selected: null,
        options: [],
        services: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      onSearch (search, loading) {
        loading(true)
        ServiceProvider.get().then(
          (response) => {
            this.services = response.body.data
            loading(false)
          },
          (err) => {
            this.$refs.serviceError.error(err)
            loading(false)
          }
        )
      },
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
        this.$events.fire('service-selector:change', service, event)
      }
    }
  }
</script>
