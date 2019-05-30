module.exports = (router) => {
    
    router.use('/users', require('./user')(router))

}