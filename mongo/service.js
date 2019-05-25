const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = process.env.JWT_SECRET
const {User} = require('./index')
const { Exception, Response, Sign } = require('./helpers')
const sign = Sign(jwt)

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
        console.log('user exists')
        throw new Response('Error', 204, 'User with that name exists')
      } else {
      const user = new User(param)
      user.hash = await bcrypt.hashSync(param.password, 10);
      await user.save()
      return new Response('OK', 200, user)
    }
  } catch (error) {
    return error
  }
}
async function authenticate(param) {
  try {
    const user = await User.findOne({ username: param.username })
    if (!user) {
      console.log('user not found')
      return new Response('Error', 204, 'user not found')
    } else {
      if (bcrypt.compareSync(param.password, user.hash)) {
        console.log('logged in')
        const { hash, ...userWithoutHash } = user.toObject()
        const token = sign({ sub: user.id }, process.env.JWT_SECRET, { algorithm: 'HS256'})
        return new Response('OK', 200, {...userWithoutHash, token: await token })
      } else {
        console.log('bad password') 
        throw new Response('Error', 204, 'bad password')
      }
    }
  } catch (error) {
    console.log(error) 
    return error
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
