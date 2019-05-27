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

if (process.env.NODE_ENV === 'production') {

  app.use(Static(__dirname + '/front/build'))
  router.get('*', async (ctx, next) => {
    try {
      await Send(ctx, './client/build/index.html');
    } catch(err) {
  //
    console.log(err)
      return next();
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



app.use(Respond())

require('./mongo/user')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
