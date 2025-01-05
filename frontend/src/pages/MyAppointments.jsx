import React, { useContext } from 'react'
import { AppContext } from "../context/Context"
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify/unstyled';
import { useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = useContext(AppContext);
 const navigate=useNavigate();

  const [appointments, setAppointments] = useState([])

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendurl + '/api/user/appointments', { headers: token })

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }


    } catch (error) {
      toast.error(error.message)

    }
  }

  const cancelappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendurl + '/api/use/cancel-appointment', { appointmentId }, { headers: token })
      if (data.success) {
        toast.success(data.message)
        getUsersAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  const month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + month[Number[dateArray[1]]] + " " + dateArray[2]
  }

const appointmentrazorpay=async(appointmentId)=>{
  try{
      const {data}=await axios.post(backendurl+'/api/user/payment-razorpay',{appointmentId},{headers:token})
      if(data.success){
        initPay(data.order)
      }

  }catch(error){
   
  }
}

const initPay=(order)=>{
        const options={
          key:import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount:order.amount,
          currency:order.currency,
          name:'Appointment Payment',
          description:"Appointment PAyment",
          receipt:order.receipt,
          handler:async(response)=>{
                try{
                    const {data}=await axios.post(backendurl+'/api/user/verifyRazorpay',response,{headers:token})
                    if(data.success){
                      getUsersAppointments()
                      navigate('/my-appointments')
                    }
                }catch(error){
                    toast.error(error.message)
                }
          }
        }
        const rzp= new window.Razorpay(options)
        rzp.open()

}






  useEffect(() => {
    if (token) {

      getUsersAppointments()
    }
  }, [token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item, i) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={i}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time</span>{slotDateFormat(item.slotDate)} | {item.slotTime} | </p>
              </div>
              <div></div>
              <div className='flex flex-col gap2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted &&
                  <button onClick={()=>appointmentrazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 '>Pay Online</button>
                }
                {!item.cancelled && !item.isCompleted &&
                  <button onClick={() => cancelappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel appointment</button>
                }
                {
                  item.cancelled && !item.isCompleted &&
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>
                }
                {
                  item.isCompleted &&
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
