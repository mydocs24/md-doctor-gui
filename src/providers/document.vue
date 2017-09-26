<script>
  /**
   * Services
   */
  import Vue from 'vue'

  const documentsUrl = 'doctor/documents'

  export default {
    getUrl () {
      return documentsUrl
    },
    moveDocument (id, document) {
      return Vue.axios.patch(this.getUrl() + '/' + id, document)
    },
    deleteDocument (id) {
      return Vue.axios.delete(this.getUrl() + '/' + id)
    }
  }
</script>
