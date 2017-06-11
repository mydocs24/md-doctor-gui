<template>
    <v-select
            v-if="getItems().length"
            :clearSearchOnSelect="true"
            :options="getItems()"
            :on-change="onSelected"
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
          let found = false
          _.forEach(this.excluded, (excluded) => {
            if (_.isEqual(row, excluded)) {
              found = true
            }
          })
          return !found
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
