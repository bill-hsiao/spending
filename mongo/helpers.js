// class Exception {
//     contructor (status, error) {
//         this.name = 'Error';
//         this._code = status;
//         this._message = error;
//     }
//     message() {
//         return this.name + ':' + this._message
//     }
//     code() {
//         return this._code
//     }
// }


function Exception(status, error) {
    this.name = 'Error';
    this._code = status;
    this._message = error;
}


// function sign(jwt, payload, secret, options) {
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, secret, options, (error, body) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(body);
//       }
//     });
//   });
// }
function Sign(jwt) {
  return function(payload, secret, options) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (error, body) => {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          console.log(body)
          resolve(body);
        }
      });
    });
  }
}


// , payload, secret, options) {
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, secret, options, (error, body) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(body);
//       }
//     });
//   });
// }

  

module.exports = {Exception, Sign}

// function Exception(status, error) {
//     this.name = 'Error';
//     this._code = status
// }