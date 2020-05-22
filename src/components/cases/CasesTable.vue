<template>
    <div class="case-table-component">
        <div v-if="showFilters" class="row mb-3">
            <div class="col-sm-12">
                <filter-bar></filter-bar>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-block m-2">
                        <div class="card-title">
                            <h5>
                                {{ $t('My Cases') }}
                                <small class="filter-control" @click="showFilters = !showFilters">
                                    {{ showFilters ? '&times; ' + $t('Hide filters') : '&darr; ' + $t('Show filters') }}</small>
                            </h5>
                        </div>
                        <div class="row case-control">
                            <div class="col-sm-12 small">
                                <a class="item link" :title="$t('Send selected items to the director')"
                                   @click="onSend(null)"
                                   v-if="showSend">{{ $t('Send') }}</a>
                            </div>
                        </div>

                        <vuetable
                          ref="vuetable"
                          :api-url="caseUrl"
                          :api-mode="true"
                          :http-options="httpOptions"
                          :class="css.tableClass"
                          :fields="fields"
                          pagination-path="pagination"
                          data-path="list"
                          :per-page="10"
                          :sort-order="sortOrder"
                          detail-row-component="my-detail-row"
                          :no-data-template="$t('No Data Available')"
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
                                        :no-data-template="$t('No relevant data')"
                                        :info-template="$t('Displaying {from} to {to} of {total} items')"
                                ></vuetable-pagination-info>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- div class="row">
            <div class="col-sm-11 mx-auto">
                <hr>
                <div class="total">
                    {{ $t('Total') }}: 2000 &euro;
                </div>
            </div>
        </div -->
        <dialog-confirm ref="dialogConfirm"></dialog-confirm>
    </div>
</template>

<style lang="scss">
    @import "../../sass/variables";

    .case-table-component {
        .filter-control {
            float: right;
            cursor: pointer;
        }
        .pagination-block {
            float: right;

            .pagination {
                margin-bottom: 0;
                .page-item {
                    cursor: pointer;

                    &.disabled {
                        cursor: default;
                        .page-link {
                            color: $text-muted;
                            cursor: default;
                        }
                    }
                    &.active {
                        .page-link {
                            background-color: #3097D1;
                            color: $white;
                        }
                    }
                }
            }
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
            float: right;
            font-size: $font-size-lg;
            font-weight: $font-weight-bold;
            margin-bottom: $offset-bottom;
        }
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
import AccidentProvider from '../../providers/accident.vue'
import DialogConfirm from '../../components/ui/dialog/confirm.vue'

Vue.component('my-detail-row', MyDetailRow)

export default {
  inject: ['loadingBarWrapper'],
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar,
    CustomActions,
    DialogConfirm
  },
  notifications: {
    showHttpError: {type: 'error'},
    showGowl: {
      type: 'error'
    }
  },
  data () {
    return {
      showCopy: false,
      showSign: false,
      showSend: false,
      caseUrl: Vue.axios.defaults.baseURL + '/' + AccidentProvider.getUrl(),
      httpOptions: {
        headers: {Authorization: 'Bearer ' + this.$auth.token()}
      },
      showFilters: false,
      fields: [
        {
          name: 'createdAt',
          title: this.$t('Date'),
          sortField: 'createdAt',
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
          sortField: 'city'
        },
        {
          name: 'statusTitle',
          title: this.$t('Status'),
          sortField: 'statusTitle',
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
          field: 'createdAt',
          sortField: 'createdAt',
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
      return $vuetable.tableData.filter(function (item) {
        return $vuetable.selectedTo.indexOf(item[$vuetable.trackBy]) >= 0
      })
    },
    showConfirmation (selected, msg) {
      if (!selected) {
        selected = this.getSelected()
      }

      const titles = []
      selected.map(row => titles.push(row.refNum))

      this.$refs.dialogConfirm.show(this.$t('Confirmation'), msg, titles, () => {
        this.send(selected)
      })
    },
    send (selected) {
      this.loadingBarWrapper.ref.start()
      const identifiers = []
      selected.map(row => identifiers.push(row.id))
      AccidentProvider.sendCases(identifiers)
        .then(() => {
          this.$refs.dialogConfirm.onClose()
          this.$refs.vuetable.refresh()
          this.loadingBarWrapper.ref.done()
        })
        .catch(error => {
          this.showGowl({
            title: this.$t('Send Error'),
            message: this.$t('Server error'),
            consoleMessage: error
          })
          this.loadingBarWrapper.ref.fail()
        })
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
        let onlyProcessing = selected.filter(function (item) {
          return item.status === 'in_progress'
        })

        if (selected.length === onlyProcessing.length) {
          this.showSend = true
        }
      }
    },
    onCloseRow () {
      // FYI REASON close row doesn't work without this
      // why I need that?
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
        case 'assigned':
          badge = '<span class="badge badge-success">' + this.$t('case.status.new') + '</span>'
          break
        case 'sended':
          badge = '<span class="badge badge-warning">' + this.$t('case.status.sent') + '</span>'
          break
        case 'in_progress':
          badge = '<span class="badge badge-info">' + this.$t('case.status.processing') + '</span>'
          break
        // new by default
        default: badge = '<span class="badge badge-danger" title="' + this.$t('Status not defined') + '">' + value + '</span>'
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
      this.loadingBarWrapper.ref.done()
    },
    onLoadError (err) {
      this.showHttpError({
        title: this.$t('API Error'),
        message: this.$t('Cases have not been loaded'),
        consoleMessage: err.message
      })
      this.loadingBarWrapper.ref.fail()
    },
    onLoading () {
      this.loadingBarWrapper.ref.start()
    },
    transform (data) {
      let transformed = {}

      let to = data.meta.pagination.current_page * data.meta.pagination.per_page
      if (to > data.meta.pagination.total) {
        to = data.meta.pagination.total
      }

      transformed.pagination = {
        total: data.meta.pagination.total,
        per_page: data.meta.pagination.per_page,
        current_page: data.meta.pagination.current_page,
        last_page: data.meta.pagination.total_pages,
        next_page_url: data.meta.pagination.links.next,
        prev_page_url: data.meta.pagination.links.prev,
        from: (data.meta.pagination.current_page - 1) * data.meta.pagination.per_page + 1,
        to: to
      }

      transformed.list = data.data

      return transformed
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
    'vuerow:send' (caseData) {
      this.onSend(caseData)
    }
  }
}
</script>
