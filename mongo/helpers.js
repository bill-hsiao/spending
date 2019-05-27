module.exports = {
  Response, 
  Sign,
  Hash,
  Compare,
  QueryOne, 
  Save
}

function Response(type, status, body) {
  this.type = type;
  this.code = status;
  this.body = body;
}

function Sign(jwt) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      jwt.sign(...args, (error, token) => {
        error ? reject(error) : resolve(token)
      })
    })
  }
}

function Hash(bcrypt) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(...args, (error, hash) => {
        error ? reject(error) : resolve(hash)
      })
    })
  }
}

function Compare(bcrypt) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(...args, (error, res) => {
        error ? reject(error) : resolve(res)
      })
    })
  }
}

function QueryOne(model) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      model.findOne(...args, (error, result) => {
        error ? reject(error) : resolve(result)
      })
    })
  }
}

function Save(model) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      model.save(...args, (error, result) => {
        error ? reject(error) : resolve(result)
      })
    })
  }
}