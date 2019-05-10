const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const {User} = require('./index')

module.exports = {
  create,
  authenticate,
  update,
  delete: del,
  getById,
  getAll
}

async function create(param) {
    if (await User.findOne({ email: param.email })) {
      console.log('found!');
      throw 'user found'
    } else {
      const user = new User(param)
      user.pass = await bcrypt.pass(param.pass, 10);
      await user.save();
    }
}
async function findUser(param) {
  const user = await User.findOne({ email: param.email }
}


async function authenticate(param) {
  try {
    const user = await User.findOne({ email: param.email })
    if (!user) throw 'not found'
    if (user && await bcrypt.compare(param.pass, user.pass)) {
      const { pass, ...userWithoutPass } = user.toObject();
      const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);
      console.log(token);
      return { ...userWithoutPass, token: await token}
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}



async function update(param, id) {
  try {
    const user = await User.findById(id);
    if (!user) throw 'User does not exist'
    const queriedUser = await User.findOne({ email: param.email })
    //if current email is not new parameter and queried user exists
    if (user.email !== param.email && queriedUser) throw new Error('email taken')
    //if password, pass it
    if (param.pass) {
      param.pass = await bcrypt.pass(param.pass, 10);
    }
    Object.assign(user, param)
    await user.save();
  } catch (err) {
    console.log(err);
    throw err
  }
}

async function del(id) {
  const user = await User.findByIdAndRemove(id);
}


async function getById(id) {
  const user = await User.findById(id).select('-pass');
  return user
}

async function getAll() {
  const users = await User.find().select('-pass');
  console.log(users);
  return users
}
