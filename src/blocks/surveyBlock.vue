<template>
    <div>
        <div class="row">
            <div class="col-sm-7">
                <label class="label">{{ $t('Select surveys') }}</label>
                <survey-selector
                        name="survey"
                        excluded="selectedSurveys"
                ></survey-selector>
            </div>
            <div class="col-sm-5">
                <div class="mt-sm-4 text-right">
                    <survey-editor></survey-editor>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="selectedSurveys && selectedSurveys.length">
            <div class="col-12">
                <table class="table table-striped table-hover table-sm">
                    <thead class="thead-inverse">
                    <tr>
                        <th>
                            {{ $t('Surveys') }}
                        </th>
                        <th>
                            {{ $t('Description') }}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="survey in selectedSurveys" :class="survey.type === 'doctor' ? 'table-danger' : ''">
                        <td>{{ survey.title }}</td>
                        <td>{{ survey.description }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" :title="$t('Delete')" @click="onSurveyDelete(survey)">&times;</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import SurveySelector from '../components/survey/surveySelector.vue'
  import SurveyEditor from '../components/survey/surveyEditor.vue'

  export default {
    components: {
      SurveySelector,
      SurveyEditor
    },
    data () {
      return {
        selectedSurveys: null
      }
    },
    methods: {
      setSelectedSurveys (surveys) {
        this.selectedSurveys = surveys
      },
      addSurvey: function (survey) {
        if (!this.selectedSurveys) {
          this.selectedSurveys = []
        }

        if (this.getSurveyKey(survey) === false) {
          this.selectedSurveys.push(survey)
        }
      },
      onSurveyDelete (survey) {
        let key = this.getSurveyKey(survey)
        if (key !== false) {
          Vue.delete(this.selectedSurveys, key)
        }
      },
      getSurveyKey (survey) {
        let key = false
        this.selectedSurveys.forEach(function (_survey, index) {
          if (survey.id === _survey.id && _survey.type === survey.type) {
            key = index
          }
        })
        return key
      }
    },
    events: {
      'survey-selector:change' (survey) {
        if (survey) {
          this.addSurvey(survey)
        }
      },
      'survey-editor:save' (survey) {
        console.log(survey, 'added or updated survey for updating I could delete and add it again')
      }
    }
  }
</script>
