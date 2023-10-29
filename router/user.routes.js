const express=require('express')
const bcrypt=require('bcrypt')
const { userModel } = require('../model/user.model')
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

userRouter.post('/register',(req,res)=>{
    const{name,email,pass}=req.body
    try{
        bcrypt.hash(pass,3,async(err,hash)=>{
            if(err){
                res.status(200).send({"msg":err})
            }else{
                const user=new userModel({name,email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"new user added","newUser":user})
            }
        })
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    try{
        let user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({username:user.name,userID:user._id},"masai")
                    res.status(200).send({"msg":`${user.name} login in successfully`,"Token":token})
                }else{
                    res.status(200).send({"error":err.message})
                }
            })
        }
        else{
            res.status(200).send({"msg":"user not found"})
        }
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={userRouter}