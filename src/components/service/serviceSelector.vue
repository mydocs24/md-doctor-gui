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
    inject: ['loadingBarWrapper'],
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
    notifications: {
      showHttpError: {type: 'error'}
    },
    methods: {
      onSearch (search, loading) {
        console.log(search, 'todo need to be merged with fetch data')
        this.loadingBarWrapper.ref.start()
        loading(true)
        ServiceProvider.get().then(
          (response) => {
            this.services = response.data
            loading(true)
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get Services'),
              consoleMessage: err.message
            })
            this.loadingBarWrapper.ref.fail()
            loading(false)
          }
        )
      },
      fetchData () {
        this.loadingBarWrapper.ref.start()
        ServiceProvider.get().then(
          (response) => {
            this.options = response.data.data
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get Patient'),
              consoleMessage: err.message
            })
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
