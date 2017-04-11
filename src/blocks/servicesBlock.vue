<template>
    <div>
        <div class="row">
            <div class="col-sm-7">
                <label class="label" for="service">{{ $t('Select services') }}</label>
                <service-selector
                        name="service"
                        excluded="selectedServices"
                ></service-selector>
            </div>
            <div class="col-sm-5">
                <div class="mt-sm-4 text-right">
                    <button class="btn btn-sm btn-info" @click.prevent>+ {{ $t('Add new service') }}</button>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="selectedServices && selectedServices.length">
            <div class="col-12">
                <table class="table table-striped table-hover table-sm">
                    <thead class="thead-inverse">
                    <tr>
                        <th>
                            {{ $t('Service') }}
                        </th>
                        <th>
                            {{ $t('Description') }}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="service in selectedServices">
                        <td>{{ service.title }}</td>
                        <td>{{ service.description }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" :title="$t('Delete')" @click="onServiceDelete(service)">&times;</button>
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
      addService: function (service) {
        if (!this.selectedServices) {
          this.selectedServices = []
        }

        if (this.getServiceKey(service) === false) {
          this.selectedServices.push(service)
        }
      },
      onServiceDelete (service) {
        let key = this.getServiceKey(service)
        if (key !== false) {
          Vue.delete(this.selectedServices, key)
        }
      },
      getServiceKey (service) {
        let key = false
        this.selectedServices.forEach(function (_service, index) {
          if (service.id === _service.id) {
            key = index
          }
        })
        return key
      }
    },
    events: {
      'selector:change' (service) {
        if (service) {
          this.addService(service)
        }
      }
    }
  }
</script>
