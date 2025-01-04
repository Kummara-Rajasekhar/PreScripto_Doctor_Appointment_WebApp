import React, { useContext } from 'react'
import Llogin from './pages/Llogin'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
const App = () => {

  const {aToken} =useContext(AdminContext);
  return aToken? (
    <div className='bg-[#f*F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route  path='/' element={<></>}/>
          <Route  path='/admin-dashboard' element={<DashBoard/>}/>
          <Route  path='/all-appointments' element={<AllAppointments/>}/>
          <Route  path='/add-doctor' element={<AddDoctor/>}/>
          <Route  path='/doctor-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
    </div>
  ):(
    <div>
      <Llogin/>

    </div>
  )
}

export default App
