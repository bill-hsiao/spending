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
  try {
    const response = await user.authenticate(userParam)
    console.log(response)
    if (response.type === 'OK') {
      ctx.response.body = response.body
      ctx.response.status = response.code
      console.log(response)
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