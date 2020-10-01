const jsonServer = require('json-server')
const server = jsonServer.create()

const router = jsonServer.router('./json/cargo.json')
const routerFlight = jsonServer.router('./json/air.json')
const routerUser = jsonServer.router('./json/user.json')
const middleware = jsonServer.defaults()

server.use(middleware)
server.use('/data',router)
server.use('/flight',routerFlight)
server.use('/user',routerUser)
server.listen(3005, () => {
        console.log('listening on 3005')
    })
