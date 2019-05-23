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
    if (response) {
      ctx.response.body = response
      ctx.response.status = 200
    } else {
      throw error
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
    console.log(response)
    if (response) {
      ctx.response.body = response

      // console.log(err)
      ctx.response.status = 200
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