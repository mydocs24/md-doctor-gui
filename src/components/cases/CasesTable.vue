<template>
    <div>
        <div v-if="showFilters" class="row mb-3">
            <div class="col-sm-12">
                <filter-bar></filter-bar>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <top-progress ref="topProgress" color="orange"></top-progress>
                <div class="card">
                    <div class="card-block">
                        <div class="card-title">
                            <h5>
                                My Cases
                                <small class="filter-control" @click="showFilters = !showFilters">
                                    {{ showFilters ? '&times; Hide' : '&darr; Show' }} filters</small>
                            </h5>
                        </div>
                        <div class="row case-control">
                            <div class="col-sm-12 small">
                                <a class="item link" title="selected only one item">Copy</a>
                                <a class="item link" title="could be only on selected with status new">Sign</a>
                                <a class="item link" title="could be only on selected with status signed">Send</a>
                            </div>
                        </div>
                        <vuetable
                          ref="vuetable"
                          :api-url="caseUrl"
                          :class="css.tableClass"
                          :fields="fields"
                          pagination-path=""
                          :per-page="20"
                          :sort-order="sortOrder"
                          detail-row-component="my-detail-row"
                          :appendParams="moreParams"
                          @vuetable:pagination-data="onPaginationData"
                          @vuetable:cell-clicked="onCellClicked"
                          @vuetable:load-error="onLoadError"
                          @vuetable:loaded="onLoaded"
                          @vuetable:loading="onLoading"
                          @vuetable:close-row="onCloseRow"
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
        <div class="row">
            <div class="col-sm-11 mx-auto">
                <hr>
                <div class="total">
                    Total: 2000 &euro;
                </div>
            </div>
        </div>

        <b-modal ref="errorModal" size="sm">
            <h4 slot="modal-header">{{ errorModal.title }}</h4>
            <div slot="modal-body">{{ errorModal.bodyText }}</div>
            <span slot="modal-footer">
                <button class="btn btn-danger" @click="onErrorModalClose()">Close</button>
            </span>
        </b-modal>

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

    .vuetable {
        tbody > tr {
            cursor: pointer;
        }
        .vuetable-detail-row {
            cursor: default;
            background-color: #f5f8fa;
            &:hover {
                background-color: #f5f8fa;
            }
        }
    }

    .vuetable-pagination-info {
        float: right;
        font-size: $font-size-sm;
        color: $gray-lighter;
    }

    a:not([href]):not([tabindex]) {
        color: $teal;
        cursor: pointer;
        &:hover,
        &:focus,
        &:active {
            color: $blue;
        }
    }

    .case-control {
        text-align: right;
        padding-bottom: .5rem;
        .item {
            margin-right: .5rem;
        }
    }

    .total {
        float: right;;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        margin-bottom: $offset-bottom;
    }
</style>

<script>
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from './VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import CustomActions from './CustomActions'
import MyDetailRow from './DetailRow'
import FilterBar from './FilterBar'
import Vue from 'vue'
import VueEvents from 'vue-events'
import topProgress from 'vue-top-progress'
import AccidentProvider from '../../providers/accident.vue'

Vue.use(VueEvents)
Vue.component('my-detail-row', MyDetailRow)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar,
    CustomActions,
    topProgress
  },
  data () {
    return {
      caseUrl: AccidentProvider.getUrl(),
      errorModal: {
        title: '',
        bodyText: ''
      },
      showFilters: false,
      fields: [
        {
          name: 'date',
          sortField: 'date',
          callback: 'formatDate|DD.MM.YYYY',
          titleClass: 'hidden-sm-down',
          dataClass: 'hidden-sm-down'
        },
        {
          name: 'refNum',
          title: 'Referral Num',
          sortField: 'refNum'
        },
        {
          name: 'city',
          sortField: 'status'
        },
        {
          name: 'status',
          sortField: 'status',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'statusBadge'
        },
        {
          name: '__checkbox',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ],
      sortOrder: [
        {
          field: 'date',
          sortField: 'date',
          direction: 'asc'
        }
      ],
      moreParams: {},
      css: {
        linkClass: 'page-link',
        wrapperClass: 'pagination',
        disabledClass: 'disabled',
        pageClass: 'page-item',
        activeClass: 'active',
        tableClass: 'table table-bordered table-hover offset-bottom'
      },
      infoClass: 'pagination-info'
    }
  },
  methods: {
    onCloseRow () {
      console.log('here')
    },
    onErrorModalClose () {
      this.$refs.errorModal.hide()
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    statusBadge (value) {
      let badge = ''

      switch (value) {
        case 'closed':
          badge = '<span class="badge badge-default">' + this.$t('case.status.closed') + '</span>'
          break
        case 'signed':
          badge = '<span class="badge badge-primary">' + this.$t('case.status.signed') + '</span>'
          break
        case 'new':
          badge = '<span class="badge badge-success">' + this.$t('case.status.new') + '</span>'
          break
        case 'sended':
          badge = '<span class="badge badge-warning">' + this.$t('case.status.sended') + '</span>'
          break
        // new by default
        default: badge = '<span class="badge badge-danger">' + value + '</span>'
      }

      return badge
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onLoaded () {
      this.$refs.topProgress.done()
    },
    onLoadError (response) {
      this.$refs.topProgress.error = 1
      // console.log(response)
      if (response.status === 401) {
        this.errorModal.title = 'Authorization'
        this.errorModal.bodyText = 'You can\'t load list while you are not authorized.'
      } else if (response.status === 0) {
        this.errorModal.title = 'Request Error'
        this.errorModal.bodyText = 'Not a CORS response'
      } else {
        this.errorModal.title = 'Request Error'
        this.errorModal.bodyText = '"' + response.status + '" ' + response.statusText
      }

      this.$refs.errorModal.show()
    },
    onLoading () {
      this.$refs.topProgress.error = false
      this.$refs.topProgress.start()
    }
  },
  events: {
    'filter-set' (params) {
      this.moreParams = params
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      this.$refs.vuetable.refresh()
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'vuetable:close-row' (data) {
      this.$refs.vuetable.hideDetailRow(data.id)
    }
  }
}
</script>
