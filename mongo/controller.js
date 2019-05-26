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
    const response = await user.create(userParam)
    if (response.type === 'OK') {
      ctx.response.body = response.body
      ctx.response.status = response.code
      return next()
    } else {
      error = response
      throw error
    }
  } catch (error) {
    ctx.response.status = error.code
    console.log(error)
    next(error)
  }
}
//done
async function authenticate(ctx, next) {
  const userParam = ctx.request.body
  console.log(ctx.request.body)
  try {
    const response = await user.authenticate(userParam)
    console.log(response)
    if (response.type === 'OK') {
      // ctx.set()
      // ctx.response.body = {}
      ctx.response.body = await response.body
      ctx.body = response.body
      console.log('test')
      console.log(response.body)
      console.log('test')

      // console.log(response.body)
      // ctx.status = response.code
      // console.log(response)
    // await next()
  } else {
    error = response
    throw error
  }
  } catch (error) {
    ctx.response.status = error.code
    console.log(error)
    // ctx.throw(error.code, error.message)

    next(error)
  }
}
async function update(ctx, next) {
  // const {body: userParam, query.id: id} = ctx.request
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