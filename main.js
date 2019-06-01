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

// const 
const userRouter = require('./server/user')
const indexRouter = require('./server/indexRoute')


app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});

app.use(Static(__dirname + '/front/build'))
if (process.env.NODE_ENV === 'production') {
  app.use(indexRouter.routes())
  app.use(indexRouter.allowedMethods())

}


app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

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


// app.use(Respond())




module.exports = app
