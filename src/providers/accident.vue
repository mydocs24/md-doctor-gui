<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  const accidentUrl = 'doctor/accidents'

  export default {
    components: {},
    data () {
      return {
        httpOptions: {
          type: Object,
          'default': function () {
            return {}
          }
        }
      }
    },
    getUrl () {
      return accidentUrl
    },
    get () {
      return Vue.http.get(this.getUrl(), this.httpOptions)
    },
    getAccident (id) {
      return Vue.http.get(this.getUrl() + '/' + id, this.httpOptions)
    }
  }
</script>
