const app = require('./src/app')
const http = require('http')
const connectToDB = require('./src/db/db.js')
const { socketServer } = require('./src/socket/socketServer.js')

const httpServer = http.createServer(app)
socketServer(httpServer)
connectToDB()
httpServer.listen(process.env.PORT || 8000, '0.0.0.0', () => {
    console.log("server listening on port 8000")
})