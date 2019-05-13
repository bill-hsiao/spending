const user = require('./service')

module.exports = {
  register,
  authenticate,
  update,
  delete: del,
  getById,
  getCurrent,
  getAll

}
//done
async function register(ctx, next) {
  const userParam = ctx.request.body
  try {
    const response = await user.create(userParam).then(()=>{
      console.log(typeof response.code)
      console.log(response._message)

    })
    // console.log(typeof response.code)
    // console.log(response._message)
    const responses = await response
    console.log(responses._message)
    // ctx.send(204, 'user with that name exists')
    if (typeof response.code() === Number) {
      ctx.response.status = response.code
      // const error = response
      // throw error
      console.log(typeof response.code)
    } else {
      ctx.response.body = response
    }
  } catch (error) {
    next(error)
  }
}
//done
async function authenticate(ctx, next) {
  const userParam = ctx.request.body
  console.log(typeof userParam)

  try {
    const response = await user.authenticate(userParam)
    console.log(await response)
    if (response === 'User not found') {
      // console.log(err)
      ctx.response.status = response.code
    } else {
      console.log(response)
      ctx.response.body = response
    }
  } catch (error) {
    next(error)
  }
}

async function update(ctx, next) {
  const userParam = ctx.request.body
  const id = ctx.request.query.id
  try {
    const response = await user.update(id, userParam)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function del(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.delete(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getById(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.getById(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getCurrent(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.getById(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getAll(ctx, next) {
  try {
    const response = await user.getAll()
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}