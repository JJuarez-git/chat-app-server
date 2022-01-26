import WebSocketServer from './classes/WebSocketServer'

const WSServer = WebSocketServer.instance

WSServer.start(() => {
    console.log('Web Socket Server running on', WSServer.port)
})