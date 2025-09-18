const app = require('./src/app')
const http = require('http')
const connectToDB = require('./src/db/db.js')
const server = http.createServer(app)

connectToDB()
server.listen(process.env.PORT || 8001, () => {
    console.log("server listening on port 8000")
})