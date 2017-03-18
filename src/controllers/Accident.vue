<template>
    <div>
        <div class="row">
            <div class="col-sm-9 mx-auto">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">
                                    <h6>Foster Abigail
                                        <small> · <a>Edit</a></small>
                                    </h6>
                                </div>
                            </div>
                            <div class="card-block">
                                <address>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <a class="small" href="tel:+375255283638">+375255283638</a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 lead">
                                            Benidorm, Adolfa Uzuarez 162/4, 52
                                        </div>
                                    </div>
                                </address>

                                <div class="row">
                                    <div class="col-sm-12 card-text text-muted">
                                        Reason of the call. Call from the Assisstant company AXA. Patient with some ill
                                        want to
                                        get medical appointment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-success text-right">First appointment</div>
                        <div class="row justify-content-around">
                            <div class="col-sm-6">
                                <figure class="figure">
                                    <img src="../assets/camera.svg" class=" w-100 figure-img rounded-circle img-fluid"
                                         alt="Take a photo of the passport">
                                    <figcaption class="figure-caption text-right text-muted">Take a photo</figcaption>
                                </figure>
                            </div>
                            <div class="col-sm-6">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Passport</th>
                                        <th><span class="badge badge-default">0</span></th>
                                    </tr>
                                    <tr>
                                        <th>Insurance</th>
                                        <th><span class="badge badge-success">0</span></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-sm-11 mx-auto">
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
                                                <label class="form-control-label" for="case">Chose Case Type</label>
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
                                                    <a>Additional survey</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-12 mx-auto">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <label for="diagnostic" class="form-control-label">Diagnostic</label>
                                                    </div>
                                                    <div class="col-sm-6 text-right">
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
                            <div class="col-sm-6 text-center">
                                <button class="btn btn-lg btn-warning">Reject</button>
                            </div>
                            <div class="col-sm-6 text-center">
                                <button class="btn btn-lg btn-success">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <p class="mb-3 mt-2 text-center">
                        &copy; 2017 <a href="">MyDoctor24.com</a>
                    </p>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
  }
</script>
