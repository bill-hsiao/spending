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
async function authenticate(param) {
  try {
    const user = await User.findOne({ username: param.username })
      // param.hash = await bcrypt.hash(param.password, 10)
      // if (param.hash) {
        
      //   bcrypt.compare(param.password, user.hash).then((res) => {
      //     console.log(res)
      //     console.log('logged in')
      //     return res
      //   })
      // }
      if (bcrypt.compareSync(param.password, user.hash)) {
                  console.log('logged in')

      }

    else {
      console.log('bad login info')
      const error = new Exception(204, 'invalid credentials')
      throw error
    } 
  } catch (error) {
    console.log('bad login info; at caught')
      return null
    }
   
}

// async function authenticate(param) {
//   try {
//     const user = await User.findOne({ username: param.username })
//     console.log(user)
//     if (await User.findOne({ username: param.username })) {

//       console.log('found user')
//       param.hash = bcrypt.hashSync(param.password, 10)

//       if (bcrypt.compareSync(param.hash, user.hash)) {
//         console.log('successfully logged in')
//         const { hash, ...userWithoutpassword } = user.toObject();
//         const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);
//         const {hash, ...userWithoutHash } = user.toObject();
//         console.log(hash, ...userWithoutHash)
//         return { ...userWithoutpassword, token: await token}
//       } else {
//         console.log('bad pass')
//         const error = new Exception(204, 'Bad pass')
//         throw error
//       }   
//     } else {
//       console.log('bad username')

//       const error = new Exception(204, 'Bad username')
//       throw error
//     }

      // return 'User not found'
    
    // console.log(err + 'error')
  //   // throw err
  //   // console.log('hi')
  // } catch (error) {
  //   // console.log('hello')
  //   console.log('caught')
  //   return error
  //   // return 'User not found'
  // } 
  // return 'User not found'
// }
// async function authenticate(param) {
//   // console.log('hi')
//   try {
//     const user = await User.findOne({ username: param.username })
//     if (!user) {
//       // return 'User not found'
//       const error = new Exception(204, 'User not found')
//       console.log('before throw')
//       throw error
//     } else {
      
//     }
//     // console.log(err + 'error')
//     // throw err
//     // console.log('hi')
//   } catch (error) {
//     // console.log('hello')
//     console.log('caught')
//     return error
//     // return 'User not found'
//   } 
//   // return 'User not found'
// }
// async function authenticate(param) {
//   console.log('hi')

//   try {
//     const user = await User.findOne({ username: param.username })
//     if (!user) {
//       return 'User not found'
//     }
//     const { hash, err } = await bcrypt.hash(param.password, 10);
//     console.log(hash, err)


//     if (bcrypt.compareSync(param.hash, user.hash)) {
//       console.log('Wrong password')
//       return 'Wrong password'
//     } else 
   
    // if (user && await bcrypt.compareSync(param.password, user.hash)) {
    //   console.log(user.hash)
    //   console.log(bcrypt.compareSync(param.password, user.hash))
    //   console.log('here', param)
    //   const { hash, ...userWithoutpassword } = user.toObject();
    //   const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);

    //   const {hash, ...userWithoutHash } = user.toObject();
    //   console.log(hash, ...userWithoutHash)
    //   return { ...userWithoutpassword, token: await token}
    // }
//   }
//   catch (err) {
//     throw err
//   }
// }



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
