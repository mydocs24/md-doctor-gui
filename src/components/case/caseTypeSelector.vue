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
        caseTypes: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.loadingBarWrapper.ref.start()
        CaseTypeProvider.get().then(
          (response) => {
            this.options = response.data.toArray()
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.loadingBarWrapper.ref.done()
            this.httpErrorWrapper.ref.error(err)
          }
        )
      },
      onChange (caseType) {
        this.$events.fire('case-type-selector:change', caseType, event)
      },
      select (caseType) {
        this.selected = caseType
      }
    }
  }
</script>
