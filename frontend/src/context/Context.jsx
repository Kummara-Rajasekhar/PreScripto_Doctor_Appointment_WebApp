import { createContext } from "react";
import { doctors } from "../assets/assets";



export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencysymbol='$';
    const value={
        currencysymbol,
        doctors
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider