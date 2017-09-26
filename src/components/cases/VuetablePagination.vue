<template>
    <nav aria-label="Pagination">
        <ul v-if="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
            <li :class="[css.pageClass, isOnFirstPage ? css.disabledClass : '']">
                <a @click="loadPage(1)"
                   :class="['btn-nav', css.linkClass]">
                    <span>&laquo;</span>
                </a>
            </li>
            <li :class="[css.pageClass, isOnFirstPage ? css.disabledClass : '']">
                <a @click="loadPage('prev')"
                   :class="['btn-nav', css.linkClass]">
                    <span>&nbsp;&lsaquo;</span>
                </a>
            </li>
            <template v-if="notEnoughPages">
                <template v-for="n in totalPage">
                    <li :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']">
                        <a @click="loadPage(n)"
                           :class="[css.linkClass]"
                           v-html="n">
                        </a>
                    </li>
                </template>
            </template>
            <template v-else>
                <template v-for="n in windowSize">
                    <li :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']">
                        <a @click="loadPage(windowStart+n-1)"
                           :class="[css.linkClass]"
                           v-html="windowStart+n-1">
                        </a>
                    </li>
                </template>
            </template>
            <li :class="[css.pageClass, isOnLastPage ? css.disabledClass : '']">
                <a @click="loadPage('next')"
                   :class="['btn-nav', css.linkClass]">
                    <span>&rsaquo;&nbsp;</span>
                </a>
            </li>
            <li :class="[css.pageClass, isOnLastPage ? css.disabledClass : '']">
                <a @click="loadPage(totalPage)"
                   :class="['btn-nav', css.linkClass]">
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin.vue'
export default {
  mixins: [PaginationMixin]
}
</script>
