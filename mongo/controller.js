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
    if (response === 'User with that name exists') {
      ctx.response.status = 204
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
  try {
    const response = await user.authenticate(userParam)
    if (response === 'User not found') {
      ctx.response.status = 204
    } else {
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