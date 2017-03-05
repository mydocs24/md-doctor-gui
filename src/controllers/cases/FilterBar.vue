<template>
    <div class="filter-component">
        <div class="row">
            <div class="col-sm-12">
                <span class="filter-control" @click="showFilters = !showFilters">
                    {{ showFilters ? '&times; Hide' : '&darr; Show' }} filters</span>
            </div>
        </div>
        <div class="row filters" v-if="showFilters">
            <div class="col-sm-12">
                <div class="form">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <label class="label" for="filter-text">Search for</label>
                            <input type="text" v-model="filterText" id="filter-text" class="form-control input-sm"
                                   @keyup.enter="doFilter" placeholder="name, nickname, or email">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label class="label" for="from-date">From</label>
                            <input id="from-date" class="form-control input-sm"
                                placeholder="Date From">
                        </div>
                        <div class="col-sm-6">
                            <label class="label" for="to-date">To</label>
                            <input id="to-date" class="form-control input-sm"
                                   placeholder="Date To">
                        </div>
                    </div>
                    <button class="btn btn-info btn-sm" @click="doFilter">Go</button>
                    <button class="btn btn-sm" @click="resetFilter">Reset</button>
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

    .filters {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
    }
</style>

<script>
export default {
  data () {
    return {
      filterText: '',
      showFilters: false
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
    }
  }
}
</script>
