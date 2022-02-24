export default class User {

    public id: string
    public email: string
    public username: string
    public room: string

    constructor(id?: string, email?: string, username?: string, room?: string) {
        this.id = id || 'no-id'
        this.email = email || 'no-email'
        this.username = username || 'no-name'
        this.room = room || 'no-room'
    }
}