import express from 'express'
import socketIO from 'socket.io'
import http from 'http'
import morgan from 'morgan'
import cors from 'cors'
import * as actions from '../socket/actions'
import router from '../routes/routes'
import mongoose from 'mongoose'
import mongoConnectToDatabase from '../config/mongo'
require('dotenv').config()

export default class WebSocketServer {

    private static _instance: WebSocketServer;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express()
        this.port = process.env.SERVER_PORT as unknown as number
        this.httpServer = new http.Server(this.app)
        this.io = require('socket.io')(this.httpServer, {
            cors: { credentials: true, }
        })
        this.config()
        this.routes()
        this.socketActions()
        mongoConnectToDatabase()
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    private config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(morgan('dev'))
    }

    private routes() {
        this.app.use('/api', router)
    }

    private socketActions() {
        this.io.on('connection', (client) => {
            console.log(' + Client connected', client.id, new Date().toLocaleTimeString())
            actions.connect(client)
            actions.configUser(client)
            actions.disconnect(client)
            actions.message(client, this.io)
        })
    }

    public start(callback?: any) {
        this.httpServer.listen(this.port, callback)
    }

}