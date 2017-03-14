<template>
    <div>
        <div class="row justify-content-between">
            <div class="col-sm-6 col-md-5">
                <div class="card">
                    <div class="card-block">
                        <h5>Foster Abigail</h5>
                        <p>
                            <a attr="phone" href="tel:+375255283638">+375255283638</a>
                        </p>
                        <p>
                            <address>Benidorm, Adolfa Uzuarez 162/4, 52</address>
                        </p>
                        <p class="text-muted">Reason of the call. Call from the Assisstant company AXA. Patient with some ill want to get medical appointment</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-3 align-items-end">
                <div class="text-success">First appointment</div>
                <div class="text-muted">Change patient data</div>
            </div>
        </div>

        <div class="row justify-content-around">
            <div class="col-sm-3">
                Passport
            </div>
            <div class="col-sm-3">
                Insurance
            </div>
        </div>

        <div class="row">
            <div class="col-sm-8">
                <label for="service">Select services</label>
                <select name="services[]" id="service">
                    <option value="1">Service selection</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label for="case">Chose Case Type</label>
                <select name="case" id="case">
                    <option value="">Case 1</option>
                    <option value="">Case 2</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
                + Add new Service
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <label for="survey">Survey</label>
                <select name="survey" id="survey">
                    <option value="1">Survey 1</option>
                    <option value="1">Survey 2</option>
                    <option value="1">Survey 3</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                Additional investigation
            </div>
            <div class="col-sm-3">
                Additional survey
            </div>
        </div>

        <div class="row">
            <div class="col-sm-9 mx-auto">
                <label for="diagnostic">Diagnostic</label>
                <textarea name="diagnostic" id="diagnostic" cols="30" rows="10"></textarea>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-8 mx-auto">
                <hr>
                <div class="total">
                    Total: 2000 &euro;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 text-center">
                <button class="btn btn-warning">Reject</button>
            </div>
            <div class="col-sm-6 text-center">
                <button class="btn btn-success">Accept</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>
