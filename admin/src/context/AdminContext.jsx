import { createContext, useState } from "react"

export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const [aToken ,setAToken]=useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'');
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const value={
         aToken,
         setAToken,
         backendurl
    }
    return (

    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
    )
}
export default AdminContextProvider




