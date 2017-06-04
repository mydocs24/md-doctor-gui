module.exports = {

  request: function (req, token) {
    this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
  },

  response: function (res) {
    let body = this.options.http._httpData(res)
    return body.token
  }
}
