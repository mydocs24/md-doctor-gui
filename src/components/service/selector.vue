<template>
    <div>
        <v-select
                :clearSearchOnSelect="true"
                :value.sync="selected"
                :options="options"
                on-change="onChange"
                label="title"
                :placeholder="$t('Services')"
        ></v-select>
        <table v-if="selected">
            <thead>
            <tr>
                <th>
                    {{ $t('Service') }}
                </th>
                <th>
                    {{ $t('Description') }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="service in services">
                <td>{{ service.title }}</td>
                <td>{{ service.description }}</td>
                <td>
                    <button class="btn btn-danger" :title="$t('Delete')">&times;</button>
                </td>
            </tr>
            </tbody>
        </table>
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
      vSelect
    },
    data () {
      return {
        selected: null,
        options: null,
        services: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        ServiceProvider.get().then(
          (response) => {
            this.options = response.body
          },
          (err) => {
            HttpErrorComponent.error(err)
          }
        )
      },
      onChange (service) {
        this.services.push(service)
      }
    }
  }
</script>
