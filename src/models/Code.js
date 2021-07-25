const { Schema, model } = require("mongoose")


const codeSchema = new Schema({
    "lang": { type: String, required: [true, "Language is required"] },
    "user_id": { type: String,required:[true,"UserID is required"], default: "60fd4efb65534d1164d1e303" },
    "title": { type: String, required: [true, "Title is required"],unique:true },
    "code": { type: String },
    "format":{ type: String, required: [true, "Format is required"] },
    "path": { type: String, required: [true, "Path is required"],unique:true },
    "created_at": { type:Date,default:new Date() }
})

const Code = model("Code", codeSchema)

module.exports = Code

