const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('../db/connect')

const User = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }]
})

const Expense = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  month: String,
  amount: Number,
  description: String
});

User.set('toJSON', { virtuals: true });

User.pre('save', function(next) {
  console.log('before save');
  
  next();
});
// User.pre('save', async function() {
//   console.log('pre-save hook');
//   await hashpassword(this.password)
// });
//
// async function hashpassword(password) {
//   console.log('bcrypt middleware');
//   return await bcrypt.hash(password, 10);
// }


module.exports = {
  User: mongoose.model('User', User),
  // Expense: mongoose.model('Expense', Expense)
}
