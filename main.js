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
  router.get('/*', async (ctx, next) => {
    try {
      console.log('hi')
      console.log(this, ctx.request, ctx.response)
      await Send(ctx, './front/build/index.html');
    } catch(err) {
  //
    console.log(err)
      return next();
    }
  })
}

// if (process.env.NODE_ENV === 'production') {
//   //if app is in production, will serve index
//   app.use(Static(__dirname + '/./front/build'))
//   router.get('serveReact', '/', async(ctx, next) => {
//     try {
//         console.log(ctx.path)
//         await Send(ctx, './front/build/index.html');
//     } catch (err) {
//         console.log(err)
//         next(err)
//     }
//   })
  // .get('/register', async(ctx, next) => {
    // console.log('hi')
    // await next()
    // console.log(ctx)
  // })
  // .redirect('/*', 'serveReact')
// }
// app.use(async (ctx) => {
//   if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
//   await send(ctx, ctx.path);
// })rr
// if (process.env.NODE_ENV === 'production') {
//   // app.use(Static(__dirname + '/front/build', {index : 'index.html'}));

//   app.use(async (ctx, next) => {
//     try {
//       console.log(ctx.path)
//       // const user = /users/
//       const path = ctx.path.split('/')[1]
//       if (ctx.path.split('/')[1] === 'users') {
//         if (ctx.path.split('/')[2] === 'authenticate' || ctx.path.split('/')[2] === 'register') {
//           await next()
//         } else {
//           await next()

//         }
//         // ctx.path.split('/')
//         // console.log(ctx.path.split('/')
//         // )
//         // console.log(!ctx.path)
//         // console.log(user.test(ctx.path))
//         // await Send(ctx, 'front/build/index.html');
//       } else {
//         console.log(__dirname + '/front/build/' + 'index.html')
//         Send(ctx, 'index.html', { root: __dirname + '/front/build/' });

//       }
//     } catch (err) {
//       console.log(err)
//       next()
//     }
// })
// }
// if (process.env.NODE_ENV === 'production') {
//   console.log('hi')
//   app.use(Static(__dirname + './front/build'))
//   router.get('/', async (ctx, next) => {
//     try {
//       console.log('hi')
//       // console.log(this, ctx.request, ctx.response)
//       await Send(ctx, 'front/build/index.html');
// } catch(err) {
//   //
//     console.log(err)
//     // await Send(ctx, './front/build/index.html');

//       return next();
//     }
//   })
// }
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

require('./server/user')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
