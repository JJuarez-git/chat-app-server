export default class User {

    public id: string
    public username: string
    public room: string

    constructor(id?: string, username?: string, room?: string) {
        this.id = id || 'no-id'
        this.username = username || 'no-name'
        this.room = room || 'no-room'
    }
}