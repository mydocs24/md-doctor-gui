<template>
    <div>
        <div class="row offset-bottom">
            <div class="col-sm-12">
                <filter-bar></filter-bar>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-block">
                        <div class="card-title">
                            <h5>My Cases</h5>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 case-control small">
                                <a title="selected only one item">Copy</a>
                                <a title="could be only on selected with status new">Sign</a>
                                <a title="could be only on selected with status signed">Send</a>
                            </div>
                        </div>
                        <vuetable ref="vuetable"
                                  class="table table-bordered table-hover offset-bottom"
                                  api-url="http://vuetable.ratiw.net/api/users"
                                  :fields="fields"
                                  pagination-path=""
                                  :per-page="20"
                                  :sort-order="sortOrder"
                                  detail-row-component="my-detail-row"
                                  :appendParams="moreParams"
                                  @vuetable:pagination-data="onPaginationData"
                                  @vuetable:cell-clicked="onCellClicked"
                        ></vuetable>
                        <div class="row">
                            <div class="col-sm-12 pagination-block">
                                <vuetable-pagination
                                        ref="pagination"
                                        class="pagination"
                                        :css="css"
                                        @vuetable-pagination:change-page="onChangePage"
                                ></vuetable-pagination>
                                <vuetable-pagination-info
                                        ref="paginationInfo"
                                ></vuetable-pagination-info>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <div class="total">
                    Total: 2000 &euro;
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../sass/variables";

    .page-item {
        cursor: pointer;
    }
    .pagination-block {
        float: right;
    }
    .pagination {
        margin-bottom: 0;
    }
    .vuetable-pagination-info {
        float: right;
        font-size: $font-size-sm;
        color: $gray-lighter;
    }

    .case-control {
        text-align: right;
    }

    .total {
        float: right;;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
    }
</style>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from './VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import CustomActions from './CustomActions'
import DetailRow from './DetailRow'
import FilterBar from './FilterBar'
import Vue from 'vue'
import VueEvents from 'vue-events'

Vue.use(VueEvents)
Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)
Vue.component('filter-bar', FilterBar)
export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      fields: [
        {
          name: 'birthdate',
          sortField: 'birthdate',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'formatDate|DD.MM.YYYY'
        },
        {
          name: 'nickname',
          sortField: 'nickname',
          callback: 'allcap'
        },
        {
          name: 'name',
          sortField: 'name'
        },
        {
          name: 'gender',
          sortField: 'gender',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'genderLabel'
        },
        {
          name: '__checkbox',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ],
      sortOrder: [
        {
          field: 'birthdate',
          sortField: 'birthdate',
          direction: 'asc'
        }
      ],
      moreParams: {},
      css: {
        linkClass: 'page-link',
        wrapperClass: 'pagination',
        disabledClass: 'disabled',
        pageClass: 'page-item',
        activeClass: 'active'
      },
      infoClass: 'pagination-info'
    }
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(data.id)
    }
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        'filter': filterText
      }
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      this.$refs.vuetable.refresh()
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    }
  }
}
</script>
