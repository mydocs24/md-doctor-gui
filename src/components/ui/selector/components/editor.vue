<template>
    <div class="editor-container">
        <button class="btn btn-sm btn-info" @click.prevent="onOpen(this)">{{ $t('Add') }}</button>
        <b-modal ref="selectorEditor" class="b-modal">
            <h5 slot="modal-header">{{ $t('New') + ' ' + editorTitle }}</h5>
            <div class="form">
                <b-alert :show="!valid" variant="warning" dismissible>
                    {{ $t('All fields should be filled') }}
                </b-alert>
                <div class="form-group">
                    <div class="col-12">
                        <label class="label">{{ $t('Title') }}</label>
                        <input
                                @change="onChange"
                                @keydown="onChange"
                                type="text"
                                class="form-control"
                                v-model="title"
                                :placeholder="editorTitle + ' ' + $t('Title')"
                                required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-12">
                        <label class="label">{{ $t('Description') }}</label>
                        <input
                                @change="onChange"
                                @keydown="onChange"
                                class="form-control"
                                v-model="description"
                                :placeholder="editorTitle + ' ' + $t('Description')"
                                required>
                    </div>
                </div>
            </div>
            <span slot="modal-footer">
                <button class="btn btn-primary" @click="onSave()" :disabled="!valid">{{ $t('Save') }}</button>
                <button class="btn btn-secondary" @click="onClose()">{{ $t('Cancel') }}</button>
            </span>
        </b-modal>
    </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    props: {
      editorTitle: {
        type: String,
        required: true
      },
      inpTitle: {
        type: String,
        default: ''
      },
      inpDescription: {
        type: String,
        default: ''
      },
      id: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        title: '',
        description: '',
        valid: true
      }
    },
    mounted () {
      this.title = this.inpTitle
      this.description = this.inpDescription
      this.onChange()
    },
    methods: {
      onOpen (btn) {
        let $btn = $(btn)
        let $container = $btn.parents('.editor-container')
        this.title = this.inpTitle
        this.description = this.inpDescription
        this.onChange()
        $('.b-modal', $container).css({display: 'block'})
        this.$refs.selectorEditor.show()
      },
      onSave () {
        if (this.isValid()) {
          this.$emit('save-item', {
            id: this.id,
            title: this.title,
            description: this.description,
            editorEl: this // to close it from the outside
          })
        }
      },
      onClose () {
        this.$refs.selectorEditor.hide()
      },
      onChange () {
        this.valid = true
      },
      isValid () {
        this.valid = this.title.length && this.description.length
        return this.valid
      }
    }
  }
</script>
