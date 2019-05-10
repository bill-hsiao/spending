const userController = require('./controller')

module.exports = router => {

    router.post('/register', userController.register)
    router.post('/authenticate', userController.authenticate)
    router.put('/:id', userController.update)
    router.delete('/:id', userController.delete)
    router.get('/:id', userController.getById)
    router.get('/current', userController.getCurrent)
    router.get('/', userController.getAll)

    return router.routes()
    
}
