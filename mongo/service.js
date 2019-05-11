const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = process.env.JWT_SECRET
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
  try {
    if (await User.findOne({ username: param.username })) {
      console.log('found!');
      throw 'user found'
    } else {
      const user = new User(param)
      user.hash = await bcrypt.hash(param.password, 10);
      await user.save();
    }
  } catch (err) {
    console.log('error creating user')
    throw err
  }

}



async function authenticate(param) {
  try {
    const user = await User.findOne({ username: param.username })
    if (!user) throw err
    param.hash = await bcrypt.hash(param.password, 10);
    
    if (user && await bcrypt.compare(param.hash, user.hash)) {
      console.log(param.hash, user.hash)
      const { password, ...userWithoutpassword } = user.toObject();
      const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);
      console.log(token);
      return { ...userWithoutpassword, token: await token}
    }
  }
  catch (err) {
    console.log('error authenticating user');
    throw err
  }
}



async function update(param, id) {
  try {
    const user = await User.findById(id);
    if (!user) throw 'User does not exist'
    const queriedUser = await User.findOne({ username: param.username })
    if (user.username !== param.username && queriedUser) throw 'username taken'
    if (param.password) {
      const hash = await bcrypt.hash(param.password, 10);
    }
    Object.assign(user, {
      hash: hash,
      username: param.username
    })
    await user.save();
  } catch (err) {
    console.log('error updating user')
    throw err
  }
}

async function del(id) {
  const user = await User.findByIdAndRemove(id);
}


async function getById(id) {
  const user = await User.findById(id).select('-password');
  return user
}

async function getAll() {
  const users = await User.find().select('-password');
  console.log(users);
  return users
}
