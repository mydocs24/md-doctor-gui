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
        <http-error-component ref="caseTypeError"></http-error-component>
    </div>
</template>
<script>
  import vSelect from 'vue-select'
  import HttpErrorComponent from '../../components/ui/http/error.vue'
  import CaseTypeProvider from '../../providers/caseType.vue'

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
        caseTypes: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        CaseTypeProvider.get().then(
          (response) => {
            this.options = response.body.data
          },
          (err) => {
            this.$refs.caseTypeError.error(err)
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
