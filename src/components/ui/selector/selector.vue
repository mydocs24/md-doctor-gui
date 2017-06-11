<template>
    <div>
        <div class="row">
            <div class="col-sm-7">
                <label class="label">{{ label }}</label>
                <select-component
                    :excluded="selectedItems"
                    :title="title"
                    :items="items"
                ></select-component>
            </div>
            <div class="col-sm-5">
                <div class="mt-sm-4 text-right">
                    <editor-component
                        :editorTitle="title"
                        @save-item="onSave($event)"
                    ></editor-component>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="selectedItems && selectedItems.length">
            <div class="col-12">
                <table class="table table-striped table-hover table-sm table-bordered">
                    <thead class="thead-inverse">
                    <tr>
                        <th>
                            {{ title }}
                        </th>
                        <th>
                            {{ $t('Description') }}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in selectedItems" :class="isHighlighted(item) ? 'table-danger' : ''">
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="onDelete(item)">{{ $t('Delete') }}</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import Vue from 'vue'
  import SelectComponent from './components/select.vue'
  import EditorComponent from './components/editor.vue'

  export default {
    components: {
      SelectComponent,
      EditorComponent
    },
    props: {
      // Label under the select block
      label: {
        type: String,
        required: true
      },
      // Title of the column in the table
      title: {
        type: String,
        required: true
      },
      // Will be selected on init and excluded from the select element
      selectedItems: {
        type: Array,
        default: []
      },
      // List of the data [also required parameters: 'title', 'description', 'id']
      items: {
        type: Array,
        required: true
      },
      // to highlight row should be provided method to detect these rows
      // by default without highlighting
      checkHighlighting: {
        type: Function,
        default: function (item) {
          return false
        }
      }
    },
    methods: {
      isHighlighted (item) {
        return this.checkHighlighting(item)
      },
      onDelete (item) {
        let key = this.getKey(item)
        if (key !== false) {
          Vue.delete(this.selectedItems, key)
        }
      },
      onSave (data) {
        this.$emit('save-item', data)
      },
      getKey (item) {
        let key = false
        this.selectedItems.forEach(function (_item, index) {
          if (item.id === _item.id) {
            key = index
          }
        })
        return key
      },
      setSelected (items) {
        this.selectedItems = items
      },
      addItem: function (item) {
        if (!this.selectedItems) {
          this.selectedItems = []
        }

        if (this.getKey(item) === false) {
          this.selectedItems.push(item)
        }
      }
    }
  }
</script>
