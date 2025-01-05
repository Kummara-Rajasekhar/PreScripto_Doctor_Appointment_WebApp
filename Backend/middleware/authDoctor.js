



import jwt from 'jsonwebtoken'

//docotr authentication middleware
const authDoctor=async(req,res,next)=>{
    try{
        const {dtoken}=req.headers;
        if(!dtoken){
            return res.json({success:false,message:"Not Authorised Login Admin"})
        }
        const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PW){
            return res.json({success:false,message:"Not Authorised Login Admin"})

        }
        req.body.docId=token_decode.id
        next()
    }catch(error){
          res.json({success:false,message:error.message})
    }
}

export default authDoctor
