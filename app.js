const Koa = require('koa')
const Static = require('koa-static')
const Send = require('koa-send');


const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const Router = require('koa-router')
const Respond = require('koa-respond')


const app = new Koa()
const router = new Router()
const users = new Router()
if (process.env.NODE_ENV === 'production') {

//   app.use(async(ctx, next) => {
//     await next(Send(ctx, './front/build/index.html'))
//   })
  app.use(async(ctx, next) => {
    await next()
  })
  // app.use(async(ctx, next) => {
  //   return next().then(() => {
  //     Send(ctx, './front/build/index.html')
  //   })
  // })
  app.use(Static(__dirname + '/front/build'))
  // console.log(__dirname)
  // router.use('/', routes())
  router.get('/*', async (ctx, next) => {
    await next(Send(ctx, './front/build/index.html'))

    console.log(ctx)
    // await next()
    
    console.log(router)
    try {
    //   if (ctx.path === '/login') {
        console.log(ctx.path)
        ctx.body = 'hi'
        // await Send(ctx, './front/build/index.html');
    //   }
      
      //  await Send(ctx, './front/build/index.html');
    } catch(err) {
    console.log(err)
      await next(err);
    }
  })
}
app.use(Logger())

app.use(Cors())
app.use(Helmet())

app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

require('./server/user')(users)


app.use(Respond())
app.use(users.routes())
app.use(users.allowedMethods())
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
