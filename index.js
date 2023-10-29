const express=require('express')
const { connection } = require('./db')
const { userRouter } = require('./router/user.routes')
const { notesRouter } = require('./router/notes.router')
const cors=require("cors")

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use(cors())
app.use("/users",userRouter)
app.use("/notes",notesRouter)

app.listen(4500,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log(err)
    }
})