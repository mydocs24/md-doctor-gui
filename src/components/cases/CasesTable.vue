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
                                {{ $t('My Cases') }}
                                <small class="filter-control" @click="showFilters = !showFilters">
                                    {{ showFilters ? '&times; ' + $t('Hide filters') : '&darr; ' + $t('Show filters') }}</small>
                            </h5>
                        </div>
                        <div class="row case-control">
                            <div class="col-sm-12 small">
                                <a class="item link" title="could be only on selected with status new"
                                   v-if="showSign"
                                   @click="onSign"
                                >{{ $t('Sign') }}</a>
                                <a class="item link" title="could be only on selected with status signed"
                                   @click="onSend"
                                   v-if="showSend">{{ $t('Send') }}</a>
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
                          @vuerow:close="onCloseRow"
                          @vuetable:checkbox-toggled="onCheckboxToggled"
                          @vuetable:checkbox-toggled-all="onCheckboxToggledAll"
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
                    {{ $t('Total') }}: 2000 &euro;
                </div>
            </div>
        </div>
        <feedback ref="feedback"></feedback>
        <dialog-confirm ref="dialogConfirm"></dialog-confirm>
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
import Feedback from '../../components/ui/dialog/feedback.vue'
import DialogConfirm from '../../components/ui/dialog/confirm.vue'

Vue.use(VueEvents)
Vue.component('my-detail-row', MyDetailRow)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar,
    CustomActions,
    topProgress,
    Feedback,
    DialogConfirm
  },
  data () {
    return {
      showCopy: false,
      showSign: false,
      showSend: false,
      caseUrl: AccidentProvider.getUrl(),
      showFilters: false,
      fields: [
        {
          name: 'date',
          title: this.$t('Date'),
          sortField: 'date',
          callback: 'formatDate|DD.MM.YYYY',
          titleClass: 'hidden-sm-down',
          dataClass: 'hidden-sm-down'
        },
        {
          name: 'refNum',
          title: this.$t('Referral Num'),
          sortField: 'refNum'
        },
        {
          name: 'city',
          title: this.$t('City'),
          sortField: 'status'
        },
        {
          name: 'status',
          title: this.$t('Status'),
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
    getSelected () {
      let $vuetable = this.$refs.vuetable
      let selected = $vuetable.tableData.filter(function (item) {
        return $vuetable.selectedTo.indexOf(item[$vuetable.trackBy]) >= 0
      })

      return selected
    },
    showConfirmation (selected, msg) {
      if (!selected) {
        selected = this.getSelected()
      }

      let titles = []
      for (let i in selected) {
        titles.push(selected[i].refNum)
      }

      this.$refs.dialogConfirm.show(this.$t('Confirmation'), msg, function () {
        console.log(selected)
      }, titles)
    },
    onSign (selected) {
      this.showConfirmation(selected, this.$t('You\'ll sign selected cases'))
    },
    onSend (selected) {
      this.showConfirmation(selected, this.$t('You\'ll send selected cases'))
    },
    onCheckboxToggledAll (checked) {
      this.reloadCaseControls()
    },
    onCheckboxToggled (checked, row) {
      this.reloadCaseControls()
    },
    /**
     * Show controls (sign, send, copy) Depends on selected checkboxes
     */
    reloadCaseControls () {
      this.showCopy = this.showSign = this.showSend = false
      let $vuetable = this.$refs.vuetable
      let selected = $vuetable.tableData.filter(function (item) {
        return $vuetable.selectedTo.indexOf(item[$vuetable.trackBy]) >= 0
      })

      if (selected.length) {
        let onlySigned = selected.filter(function (item) {
          return item.status === 'signed'
        })

        let onlyProcessing = selected.filter(function (item) {
          return item.status === 'processing'
        })

        if (selected.length === onlySigned.length) {
          this.showSend = true
        }

        if (selected.length === onlyProcessing.length) {
          this.showSign = true
        }
      }
    },
    onCloseRow () {
      // why I need that?
      // close row doesn't work without
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
        case 'processing':
          badge = '<span class="badge badge-info">' + this.$t('case.status.processing') + '</span>'
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
    onLoadError (err) {
      this.$refs.topProgress.error = 1
      let title
      let text
      if (err.status === 401) {
        title = 'Authorization'
        text = 'You can\'t load list while you are not authorized.'
      } else if (err.status === 0) {
        title = 'Request Error'
        text = 'Not a CORS response'
      } else {
        title = 'Request Error'
        text = '"' + err.status + '" ' + err.statusText
      }

      this.$refs.feedback.show(title, text)
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
    'vuerow:close' (data) {
      this.$refs.vuetable.hideDetailRow(data.id)
    },
    'vuerow:sign' (caseData) {
      this.onSign(caseData)
    },
    'vuerow:send' (caseData) {
      this.onSend(caseData)
    }
  }
}
</script>
