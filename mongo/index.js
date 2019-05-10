const mongoose = require('mongoose')
require('./db/connect')

// const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const User = new Schema({
  email: { type: String, unique: true, required: true },
  pass: { type: String, required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }]
})

const Expense = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  month: String,
  amount: Number,
  description: String
});
//
// User.pre('save', async function() {
//   console.log('pre-save hook');
//   await hashPass(this.pass)
// });
//
// async function hashPass(pass) {
//   console.log('bcrypt middleware');
//   return await bcrypt.hash(pass, 10);
// }


module.exports = {
  User: mongoose.model('User', User),
  Expense: mongoose.model('Expense', Expense)
}
