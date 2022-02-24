import socketIO, { Socket } from "socket.io"
import UsersList from '../classes/UsersList';

const usersList = UsersList.instance

export const connect = (client: Socket) => {
    usersList.addUser(client.id)
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log(` - Client disconnected`, client.id, new Date().toLocaleTimeString())
        usersList.deleteUser(client.id)
    })
}

export const configUser = (client: Socket) => {
    client.on('config-user', (payload: { email:string, username: string }) => {
        usersList.configUser(client.id, payload.email, payload.username)
    })
}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('send-message', (payload: { message: string }) => {
        console.log('new message', payload);
        io.emit('new-message', payload)
    })
}