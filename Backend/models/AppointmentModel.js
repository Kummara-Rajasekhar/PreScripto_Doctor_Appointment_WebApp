import mongoose from "mongoose";


const AppointmentSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    docId:{type:String,required:true},
    slotDate:{type:String,required:true},
    SlotTime:{type:String,required:true},
    UserDate:{type:Object,required:true},
    docDate:{type:Object,required:true},
    amout:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false},

})

const appointmentModel=mongoose.models.appointment || mongoose.model('appointment',AppointmentSchema)
export default appointmentModel

