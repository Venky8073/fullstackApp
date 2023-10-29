const express=require("express")
const { notesModel } = require("../model/notes.model")
const { auth } = require("../middleware/auth.middleware")

const notesRouter=express.Router()

notesRouter.use(auth)

notesRouter.post("/add",async(req,res)=>{
    // const {title,decr}=req.body
    try{
        let notes=new notesModel(req.body)
        await notes.save()
        res.status(200).send({"msg":"notes added"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

notesRouter.get('/',async(req,res)=>{
    try{
        let notes=await notesModel.find({username:req.body.username})
        res.status(200).send(notes)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

notesRouter.patch("/patch/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const find=await notesModel.findOne({_id:id});
        // let patchedNote=await NotesModel.updateOne({_id:req.params.id},{$set:{title:req.body}})
        if(req.body.userId==find.userId){
            await NotesModel.findByIdAndUpdate({_id:id},req.body);
res.status(200).send({"msg":"patched successfully"});
        }else{
            res.status(400).send("login");
        }
    }
    catch(err){
        res.status(400).send("error patching");
    }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const find=await notesModel.findOne({_id:id});
        if(req.body.userId==find.userId){
            await NotesModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":"deleted successfully"});
        }
    }
    catch(err){
        res.status(400).send({"msg":"error deleting"});
    }
})

module.exports={notesRouter}