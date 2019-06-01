const Send = require('koa-send');


const Router = require('koa-router')
const router = new Router()


router.get('/*', async (ctx, next) => {
    try {
        await Send(ctx, './front/build/index.html');
    } catch(err) {
        await next(err)
        console.log(err)
    }
  })

module.exports = router