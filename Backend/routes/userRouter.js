
import express from "express";
import authUser from "../middleware/authUser.js";

import { getProfile, loginUser, registerUser, updateProfile ,bookAppointment, listAppointments, cancelAppointment, paymentRazorPay} from "../controllers/userController.js";
import upload from "../middleware/multer.js";


const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointments',authUser,cancelAppointment)
userRouter.post('/paymentrazorpay',authUser,paymentRazorPay)
export default userRouter




