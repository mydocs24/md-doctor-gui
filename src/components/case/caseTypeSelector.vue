<template>
    <div>
        <v-select
                :clearSearchOnSelect="true"
                :value.sync="selected"
                :options="options"
                :on-change="onChange"
                label="title"
                :placeholder="$t('Case type')"
        ></v-select>
    </div>
</template>
<script>
  import vSelect from 'vue-select'
  import CaseTypeProvider from '../../providers/caseType.vue'

  export default {
    inject: ['loadingBarWrapper'],
    components: {
      vSelect
    },
    data () {
      return {
        selected: null,
        options: [],
        caseTypes: []
      }
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        CaseTypeProvider.get().then(
          (response) => {
            this.options = response.data.data
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.loadingBarWrapper.ref.done()
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Can\'t get accident types'),
              consoleMessage: err.message
            })
          }
        )
      },
      onChange (caseType) {
        this.$emit('change', caseType)
      },
      select (caseType) {
        this.selected = caseType
      }
    }
  }
</script>
