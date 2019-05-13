class Exception {
    contructor (status, error) {
        this.name = 'Error';
        this._code = status;
        this._message = error;
    }
    message() {
        return this.name + ':' + this._message
    }
    code() {
        return this._code
    }
}

module.exports = Exception

// function Exception(status, error) {
//     this.name = 'Error';
//     this._code = status
// }