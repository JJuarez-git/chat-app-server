import { MongoClient } from "mongodb";
import mongoose from "mongoose";

/* const USER = "jjuarez"
const PASS = "mongo1234"
const URL = `mongodb+srv://${USER}:${PASS}@jjuarez01.jtrfv.mongodb.net/?retryWrites=true&w=majority`
const DB_NAME = "chatapp"

const client = new MongoClient(URL, {
    maxPoolSize: 10,
    serverApi: "1"
})

module.exports = async () => {
    await client.connect()

    return client.db(DB_NAME)
} */

const mongoConnectToDatabase = () => {    
    mongoose.connect(process.env.MONGO_DATABASE_URL as string)
    const db = mongoose.connection
    db.on("error", (err) => console.error(err))
    db.on("open", () => console.log("MongoDB connected"))
}

export default mongoConnectToDatabase