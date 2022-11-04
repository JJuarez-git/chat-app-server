import mongoose from 'mongoose';
const Schema = mongoose.Schema

const TalksSchema = new Schema({
    name: String
}, {
    versionKey: false
})

module.exports = mongoose.model("Talks", TalksSchema)