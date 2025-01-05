import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
     const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
     const backendurl = import.meta.env.VITE_BACKEND_URL
     const [doctors, setdoctors] = useState([]);
     const [appointments, setAppointments] = useState([]);
     const getAllDoctors = async () => {
          try {
               const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { headers: aToken })
               if (data.success) {
                    setdoctors(data.doctors)
               } else {
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     const changeAvailability = async () => {
          try {
               const { data } = await axios.post(backendurl + '/api/admin/change-availability', { docId }, { headers: { aToken } })

               if (data.success) {
                    setdoctors(data.doctors)
                    getAllDoctors()

               } else {
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }

     const getAllAppointments = async () => {
          try {
               const { data } = await axios.get(backendurl + '/api/admin/appointments', { headers: aToken })
               if (data.success) {
                    setAppointments(data.appointments)

               } else {
                    toast.error(data.message)
               }

          } catch (error) {
               toast.error(error.message)
          }
     }
     const cancelAppointment = async (appointmentId) => {
          try {
               const { data } = await axios.post(backendurl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
               if (data.success) {
                    toast.success(data.message)
                    getAllAppointments()
               } else {
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     const [dashData, setDashData] = useState(false)
     const getDashData = async () => {
          try {
               const { data } = await axios.get(backendurl + '/api/admin/dashboard', { headers: { aToken } })
               if (data.success) {
                    setDashData(data.dashData)

               }
               else {
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)

          }
     }
     const value = {
          doctors,
          aToken,
          setAToken,
          backendurl,
          getAllDoctors,
          changeAvailability,
          appointments,
          setAppointments,
          getAllAppointments,
          cancelAppointment,
          dashData,
          getDashData,
     }
     return (

          <AdminContext.Provider value={value}>
               {props.children}
          </AdminContext.Provider>
     )
}
export default AdminContextProvider




