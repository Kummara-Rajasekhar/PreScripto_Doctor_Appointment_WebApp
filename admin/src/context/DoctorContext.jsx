import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {


    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setdashData] = useState(false)
    const [profiledata, setProfiledata] = useState(false)
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/appointments', { headers: { dtoken } })
            if (data.success) {
                setAppointments(data.appointments)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getdashdata = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/dashboard', { headers: { dtoken } })
            if (data.success) {
                setdashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendurl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendurl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/profile', { headers: { dtoken } })
            if (data.success) {
                setProfiledata(data.profiledata)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        dtoken,
        setdtoken,
        backendurl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getdashdata,
        dashData,
        setdashData,
        profiledata,
        setProfiledata,
        getProfileData,

    }
    return (

        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider




