<template>
    <b-modal ref="patientEditorModal" v-if="loaded">
        <h5 slot="modal-header">{{ $t('Edit patient data') }}</h5>
        <div slot="modal-body">
            <div class="form">
                <b-alert :show="!valid" state="warning" dismissible>
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
                                    v-model="name"
                                    :placeholder="$t('Patient Name')"
                                    required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-12">
                            <label class="label">{{ $t('Phone') }}</label>
                            <input
                                    @change="onChange"
                                    class="form-control"
                                    v-model="phone"
                                    :placeholder="$t('Patient Phone')"
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
                                    v-model="address"
                                    :placeholder="$t('Patient Address')"
                                    required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-12">
                            <label class="label">{{ $t('Reason of treatment') }}</label>
                            <textarea
                                    @change="onChange"
                                    class="form-control"
                                    v-model="reason"
                                    :placeholder="$t('Reason of treatment')"
                                    required></textarea>
                        </div>
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
  export default {
    inject: ['loadingBarWrapper', 'httpErrorWrapper'],
    components: {},
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        loaded: false
      }
    },
    methods: {
      open (caseId) {
        this.loadingBarWrapper.ref.start()
        console.log('opened')
      }
    }
  }
</script>
