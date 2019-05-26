function Response(type, status, body) {
  this.type = type;
  this.code = status;
  this.body = body;
}

function Sign(jwt) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      jwt.sign(...args, (error, body) => {
        error ? reject(error) : resolve(body)
      })
    })
  }
}

module.exports = {Sign, Response}
