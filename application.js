const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')

const app = new Koa()

const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')


const user = require('./user.js')


app.use(Logger())
app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))
app.use(Helmet())


app.use(respond())

const router = new Router({
  prefix: '/api'
})
//
// router.get('/:semester', async (ctx) => {
//   console.log(ctx.params.semester);
//     try {
//       let data = fs.readFileSync(`./public/${ctx.params.semester}.json`, 'utf8')
//       ctx.body = JSON.parse(data);
//     } catch (err) {
//
//     }
// })
app.use(router.routes()).use(router.allowedMethods());


module.exports = app
