<template>
    <div>
        <div class="row">
            <div class="col-sm-7">
                <label class="label" for="service">{{ $t('Select services') }}</label>
                <service-selector
                        name="service"
                        @selector:change="onSelectService"
                ></service-selector>
            </div>
            <div class="col-sm-5">
                <div class="mt-sm-4 text-right">
                    <button class="btn btn-sm btn-info" @click.prevent>+ {{ $t('Add new service') }}</button>
                </div>
            </div>
        </div>
        <div class="row" v-if="selectedServices">
            <div class="col-12">
                table with selected services + oportunity to delete them

                <table class="table">
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
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  import ServiceSelector from '../components/service/serviceSelector.vue'

  export default {
    components: {
      ServiceSelector
    },
    data () {
      return {
        selectedServices: null
      }
    },
    methods: {
      onSelectService (service) {
        console.log('new service selected')
      }
    }
  }
</script>
