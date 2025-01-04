



import jwt from 'jsonwebtoken'

//admin authentication middleware
const authUser=async(req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.json({success:false,message:"Not Authorised Login Admin"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PW){
            return res.json({success:false,message:"Not Authorised Login Admin"})

        }
        req.body.userId=token_decode.id
        next()
    }catch(error){
          res.json({success:false,message:error.message})
    }
}

export default authUser
