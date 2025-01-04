//API for adding doctor
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import sortBy from "sort-by";
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'




const addDoctor= async(req,res)=>{
    try{
       const {name,email,password,speciality,degree,experience,about,fee,address}=req.body;
       const imageFile=req.file;
       if(!name || !email || !password || !speciality || !degree || !about || !fee || !address){
          return res.json({success:false,message:"Missing Details"});
       }
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid Email"});

       }
       if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"});

       }
       const salt= await bcrypt.genSalt(10)
       const hashedpassword=await bcrypt.hash(password,salt)

       const imageupload =await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
       const imageUrl=imageupload.secure_url
       const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedpassword,
        speciality,
        degree,
        experience,
        about,
        fee,
        address:JSON.parse(address),
        date:Date.now()
       }
       const newDoctor =new doctorModel(doctorData)
       await newDoctor.save()
       res.json({success:true,message:"Doctor Added"})
    }catch(error){
          res.json({success:false,message:error.message})
    }
}


//API for admin login
const loginAdmin=async(req,res)=>{
    try{
         const {email,password}=req.body;
         if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PW){
             const token =jwt.sign(email+password,process.env.JWT_SECRET)
             res.json({success:true,token})
         }else{
            res.json({success:false,message:"Invalid credentials"})
         }
    }catch(error){
          res.json({success:false,message:error.message})
    }
}

const allDoctors=async(req,res)=>{
    try{
         const doctors=await doctorModel.find({}).select('-password')
         res.json({success:true,doctors})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}


export  {addDoctor,loginAdmin,allDoctors}









