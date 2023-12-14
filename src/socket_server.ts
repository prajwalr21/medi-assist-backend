import { Server } from "socket.io";

const server = new Server()

server.on('connection', (socket) => {
    console.log('Welcome to my ws server')
    console.log(`Your ID is ${socket.id}`)
})

server.on('error', (err) => console)

server.listen(5000)