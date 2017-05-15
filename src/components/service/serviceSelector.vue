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
    </div>
</template>
<style lang="scss">
</style>
<script>
  import _ from 'lodash'
  import vSelect from 'vue-select'
  import ServiceProvider from '../../providers/service.vue'

  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    components: {
      vSelect
    },
    props: {
      excluded: {
        type: Array,
        default: () => []
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
        this.loadingBarWrapper.ref.start()
        loading(true)
        ServiceProvider.get().then(
          (response) => {
            this.services = response.data
            loading(true)
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
            loading(false)
          }
        )
      },
      fetchData () {
        this.loadingBarWrapper.ref.start()
        ServiceProvider.get().then(
          (response) => {
            this.options = response.data
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.httpErrorWrapper.ref.error(err)
            this.loadingBarWrapper.ref.fail()
          }
        )
      },
      onChange (service) {
        this.services = _.filter(this.services, (iService) => {
          return iService.id === service.id
        })
        this.$events.fire('service-selector:change', service, event)
      }
    }
  }
</script>
