import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const [aToken ,setAToken]=useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'');
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setdoctors]=useState([]);
    const getAllDoctors=async()=>{
          try{
               const {data}=await axios.post(backendurl+'/api/admin/all-doctors',{},{headers:aToken})
               if(data.success){
                setdoctors(data.doctors)
               }else{
                toast.error(data.message)
               }
          }catch(error){
               toast.error(error.message)
          }
    }
    const changeAvailability= async ()=>{
        try{
             const {data}=await axios.post(backendurl+'/api/admin/change-availability',{docId},{headers:{aToken}})

             if(data.success){
                setdoctors(data.doctors)
                getAllDoctors()
                
             }else{
                toast.error(data.message)
             }
        }catch(error){
             toast.error(error.message)
        }
    }
    const value={
         aToken,
         setAToken,
         backendurl,
         getAllDoctors,
         changeAvailability
    }
    return (

    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
    )
}
export default AdminContextProvider




