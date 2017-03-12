<template>
    <div class="filter-component">
        <div class="card filters">
            <div class="card-block">
                <h6 class="card-title">Filters</h6>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <label class="label" for="filter-text">Search for</label>
                                        <input type="text" v-model="filterText" id="filter-text"
                                               class="form-control input-sm"
                                               @keyup.enter="doFilter" placeholder="name, nickname, or email">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="start-picker" class="col-sm-3 control-label">From</label>
                                        <date-picker :date="startTime" :option="option" id="start-picker"></date-picker>
                                    </div>
                                    <div class="col-sm-6">
                                        <label class="col-sm-3 control-label" for="end-picker">To</label>
                                        <date-picker :date="endTime" :option="option" id="end-picker"></date-picker>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-info btn-sm" @click="doFilter">Go</button>
                            <button class="btn btn-sm" @click="resetFilter">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../sass/variables";

    .filter-component {
        font-size: $font-size-sm;
    }

    .filter-control {
        float: right;
        color: $gray-light;
        cursor: pointer;
    }

    .datepicker-overlay {
        z-index: $zindex-modal !important;
    }
</style>

<script>
import DatePicker from 'vue-datepicker'
export default {
  components: {
    DatePicker
  },
  data () {
    return {
      filterText: '',
      startTime: {
        time: ''
      },
      endTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'DD.MM.YYYY',
        placeholder: '07.03.2017',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px'
        },
        color: {
          header: '#3097D1',
          headerText: '#fff'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', {
        filterText: this.filterText,
        startTime: this.startTime,
        endTime: this.endTime
      })
    },
    resetFilter () {
      this.filterText = ''
      this.startTime.time = ''
      this.endTime.time = ''
      this.$events.fire('filter-reset')
    },
    onStartDatetimeChanged: function (newStart) {
      var endPicker = this.$.endPicker.control
      endPicker.minDate(newStart)
    },
    onEndDatetimeChanged: function (newEnd) {
      var startPicker = this.$.startPicker.control
      startPicker.maxDate(newEnd)
    }
  }
}

</script>
