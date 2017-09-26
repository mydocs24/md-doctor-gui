<template>
    <ol class="breadcrumb">
        <li v-for="item in items" :class="['breadcrumb-item', item.active ? 'active' : null]">
            <router-link :to="item.link"
                         v-if="!item.active"
                         v-html="item.text"
            ></router-link>

            <b v-if="item.active" v-html="item.text" />
        </li>
    </ol>
</template>
<style lang="scss">
</style>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      }
    }
  }
</script>
