import mongoose from 'mongoose';
const TalksModel = require("./models/TalksModel")

export const getAllTalks = async () => {
    TalksModel.find({}, (err: any, docs: any) => {
        console.log(docs);
    })
}