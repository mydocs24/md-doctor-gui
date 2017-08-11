<template>
    <b-modal ref="patientEditorModal" v-if="patient">
        <h5 slot="modal-header">{{ $t('Edit patient data') }}</h5>
        <div class="form">
            <b-alert :show="!valid" variant="warning" dismissible>
                {{ $t('All fields are required') }}
            </b-alert>
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <label class="label">{{ $t('Name') }}</label>
                        <input
                                @change="onChange"
                                type="text"
                                class="form-control"
                                v-model="patient.name"
                                :placeholder="$t('Patient Name')"
                                required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <label class="label">{{ $t('Address') }}</label>
                        <input
                                @change="onChange"
                                class="form-control"
                                v-model="patient.address"
                                :placeholder="$t('Patient Address')"
                                required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <label class="label">{{ $t('About patient') }}</label>
                        <textarea
                                @change="onChange"
                                class="form-control"
                                v-model="patient.comment"
                                :placeholder="$t('Information about patient')"
                                required></textarea>
                    </div>
                </div>
            </div>
        </div>
        <span slot="modal-footer">
                <button class="btn btn-primary" @click="onSave()">{{ $t('Save') }}</button>
                <button class="btn btn-secondary" @click="onClose()">{{ $t('Cancel') }}</button>
            </span>
    </b-modal>
</template>
<script>
  import AccidentProvider from '../../providers/accident.vue'

  export default {
    inject: ['loadingBarWrapper'],
    components: {},
    props: {
      doctorCaseId: {
        type: Number,
        required: true
      }
    },
    notifications: {
      showHttpError: {type: 'error'}
    },
    created: function () {
      this.fetchData()
    },
    data () {
      return {
        patient: false,
        valid: true
      }
    },
    methods: {
      open () {
        this.$refs.patientEditorModal.show()
      },
      onClose () {
        this.$refs.patientEditorModal.hide()
      },
      onOpen () {
        this.open()
      },
      isValid () {
        this.valid = this.patient.name.length && this.patient.address.length && this.patient.comment.length
        return this.valid
      },
      onSave () {
        if (this.isValid()) {
          this.loadingBarWrapper.ref.start()
          AccidentProvider.patchPatient(this.doctorCaseId, this.patient).then(
            response => {
              this.$emit('updated', this.patient)
              this.loadingBarWrapper.ref.done()
              this.onClose()
            },
            err => {
              this.showHttpError({
                title: this.$t('API Error'),
                message: this.$t('Server error'),
                consoleMessage: err.message
              })
              this.loadingBarWrapper.ref.fail()
            }
          )
        }
      },
      fetchData () {
        this.loadingBarWrapper.ref.start()
        AccidentProvider.getPatient(this.doctorCaseId).then(
          (response) => {
            this.patient = response.data.data
            this.loadingBarWrapper.ref.done()
          },
          (err) => {
            this.showHttpError({
              title: this.$t('API Error'),
              message: this.$t('Server error'),
              consoleMessage: err.message
            })
            this.loadingBarWrapper.ref.fail()
          }
        )
      },
      onChange () {
        // console.log('changed')
      }
    }
  }
</script>
