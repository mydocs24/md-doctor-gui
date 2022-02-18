<template>
    <v-select
            v-if="getItems().length"
            :clearSearchOnSelect="true"
            :options="getItems()"
            @input="onSelected"
            :resetOnOptionsChange="true"
            label="title"
            :placeholder="$t('Choose')"
    ></v-select>
</template>
<style lang="scss">
</style>
<script>
  import _ from 'lodash'
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css'

  export default {
    components: {
      vSelect
    },
    props: {
      // title for placeholder
      title: {
        type: String,
        required: true
      },
      // need to be provided title and id props
      items: {
        type: Array,
        required: true
      },
      // items which should be hidden from the select
      excluded: {
        type: Array,
        default: []
      }
    },
    methods: {
      getItems () {
        let data = this.items
        data = _.filter(data, (row) => {
          return _.findIndex(this.excluded, excluded => excluded.id === row.id) === -1
        })

        return data
      },
      onSelected (event) {
        if (event) {
          this.excluded.push(event)
        }
      }
    }
  }
</script>
