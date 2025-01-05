import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencysymbol = '$';
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setdoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setuserdata] = useState(false)



    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/list')
            if (data.success) {
                setdoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getDoctorsData()
    }, [])



    const loaduserData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setuserdata(data.userData)
            } else {
                toast.error({ success: false, message: data.message })
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {

            setuserdata(data.userData)
        } else {
            setuserdata(false)
        }
    }, [token])







    const value = {
        currencysymbol,
        doctors,
        token,
        setToken,
        userData,
        setuserdata,
        loaduserData,
        getDoctorsData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider