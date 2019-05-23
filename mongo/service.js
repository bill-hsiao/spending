const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = process.env.JWT_SECRET
const {User} = require('./index')
const Exception = require('./exceptions')

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
        const error = await new Exception(204, 'User with that name exists')
        throw error
      } else {
      const user = new User(param)
      user.hash = await bcrypt.hashSync(param.password, 10);
      await user.save()
      return user
    }
  } catch (error) {
    console.log('caught')
    return null
  }
}


// async function authenticate(param) {
//   try {
//     const user = await User.findOne({ username: param.username })
//     if (await bcrypt.compare(param.password, user.hash)) {
//       console.log('successfully logged in')
//       const { hash, ...userWithoutpassword } = user.toObject();
//       const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);
//       const {hash, ...userWithoutHash } = user.toObject();
//       console.log(hash, ...userWithoutHash)
//       return { ...userWithoutpassword, token: await token}         
//     } else {
//       const error = new Error(204, 'Invalid credentials')
//       throw error
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }
// function token(payload) {
//   // ...

//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, config, { algorithm: "RS256" }, function(err, token2) {
//       if (err) reject(err);
//       else resolve(token2)
//     });
//   })
// }


async function authenticate(param) {
  // try {
    const user = await User.findOne({ username: param.username })
    if (!user) {
      console.log('user not found')
      return null
    } else { 
      if (bcrypt.compareSync(param.password, user.hash)) {
        console.log('logged in')
      const {hash, ...userWithoutHash } = user.toObject()
      console.log(hash)
        console.log(userWithoutHash)
        const token = await jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { algorithm: 'RS256'})
        console.log( token)
      return { ...userWithoutHash, token: await token}         
      }
    else {
      console.log('bad pass info')
      const error = new Exception(204, 'invalid credentials')
      throw error
    } 
    }
      
  // } catch (error) {
    // console.log('bad login info; at caught')
      // return null
    // }
   
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
