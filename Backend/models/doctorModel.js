import mongoose from "mongoose";

const doctorsSchema =new mongoose.Schema({
    name:{type:String,reguired:true},
    email:{type:String,required:true,unique:true},
    pasword:{type:String,reguired:true},
    image:{type:String,reguired:true},
    speciality:{type:String,reguired:true},
    degree:{type:String,reguired:true},
    experience:{type:String,reguired:true},
    about:{type:String,reguired:true},
    available:{type:Boolean,default:true},
    fee:{type:Number ,reguired:true},
    address:{type:Object ,reguired:true},
    date:{type:Number ,reguired:true},
    slots_booked:{type:Object ,default:{}},


},{minimize:false})

const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorsSchema)
export default doctorModel;


