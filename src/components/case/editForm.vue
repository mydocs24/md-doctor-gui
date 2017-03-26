<template>
    <div class="card">
        <div class="card-body">
            <div class="row mt-4">
                <div class="col-11 col-sm-10 mx-auto">
                    <form class="form">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label class="form-control-label" for="service">Select services</label>
                                    <select name="services[]" id="service" class="form-control">
                                        <option value="1">Service selection</option>
                                    </select>
                                    <div class="text-right">
                                        <a>+ Add new Service</a>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="form-control-label" for="case">Case Type</label>
                                    <select name="case" id="case" class="form-control">
                                        <option value="">Case 1</option>
                                        <option value="">Case 2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label for="survey" class="col-form-label">Survey</label>
                                    <select name="survey" id="survey" class="form-control">
                                        <option value="1">Survey 1</option>
                                        <option value="1">Survey 2</option>
                                        <option value="1">Survey 3</option>
                                    </select>
                                </div>
                                <div class="col-sm-5">
                                    <div class="mt-sm-5 text-right">
                                        <a>+ Add survey</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-12 mx-auto">
                                    <div class="row">
                                        <div class="col-4">
                                            <label for="diagnostic" class="form-control-label">Diagnostic</label>
                                        </div>
                                        <div class="col-8 text-right">
                                            <a>Additional investigation</a>
                                        </div>
                                    </div>
                                    <textarea class="form-control" name="diagnostic" id="diagnostic"
                                              rows="10"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row mt-4">
                                <div class="col-sm-8 mx-auto">
                                    <div class="total">
                                        Total: 2000 &euro;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-6 text-center">
                    <button class="btn btn-lg btn-warning" @click="doReject()">{{ $t('Reject') }}</button>
                </div>
                <div class="col-6 text-center">
                    <button class="btn btn-lg btn-success">{{ $t('Accept') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
  export default {
    components: {},
    data () {
      return {}
    }
  }
</script>
