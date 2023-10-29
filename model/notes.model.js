const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
    title:String,
    decr:String,
    username:String,
    userID:String
},{
    versionKey:false
})

const notesModel=mongoose.model("note",notesSchema)

module.exports={notesModel}