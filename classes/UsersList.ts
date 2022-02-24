import User from './User';
export default class UsersList {

    private static _instance: UsersList
    private _list: User[] = []

    constructor() { }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    public get list(): User[] {
        return this._list
    }

    public getUser(id: string): User | undefined {
        return this.list.find(user => user.id === id)
    }

    public addUser(id: string) {
        const newUser = new User(id)
        this.list.push(newUser)
        console.log(this.list);
    }

    public deleteUser(id: string) {
        this._list = this.list.filter(user => user.id !== id)
    }

    public configUser(id: string, email: string, username: string) {
        const user = this.getUser(id)
        if (user) {
            user.email = email
            user.username = username
        }
        console.log("***** CONFIG USER *****");
        console.log(this.list);
    }


}