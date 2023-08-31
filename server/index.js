import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket=>{
    console.log('Nueva conexion')

    socket.on('message', (body)=>{
        socket.broadcast.emit('message', {
            body:body,
            from:socket.id.slice(6)
        })
    })
})


server.listen(4000)
