const userController = require('./controller')
const Router = require('koa-router')
const router = new Router({
    prefix: '/users'
  })

router.post('/register', userController.register)
router.post('/authenticate', userController.authenticate)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.get('/:id', userController.getById)
router.get('/current', userController.getCurrent)
router.get('/', userController.getAll)

module.exports = router