const jwt= require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userID=decoded.userID
                req.body.username=decoded.username
                console.log(decoded)
                next()
            }else{
                res.status(200).send({"error":"not authorized"})
            }
        })
    }else{
        res.send({"msg":"please login"})
    }
}

module.exports={auth}