// module.exports = router => {
    // const userRoutes = require('./user')(router)
    // router.use('/users', require('./user')(router))
    // return function () {
        // router.use('/users', userRoutes)
    // }

// }

module.exports = function(router) {
    const api = require('./user')(router)
    router.use('/users', api)
}