import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const DoctorProfile = () => {

  const { dtoken, backendurl, profiledata, setProfiledata, getProfiledata } = useContext(DoctorContext);
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profiledata.address,
        fees: profiledata.fees,
        available: profiledata.available
      }
      const { data } = await axios.post(backendurl + '/api/doctor/update-profile', updateData, { headers: { dtoken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfiledata()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (dtoken) {
      getProfiledata()
    }
  }, [dtoken])
  return profiledata && (
    <div >
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profiledata.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100  rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profiledata.name}</p>
          <div className='flex-items-center gap-2 mt-1 text-gray-600'>
            <p>{profiledata.degree} - {profiledata.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profiledata.experience}</button>
          </div>
          <div className=''>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profiledata.about}</p>
          </div>
          <p className='tet-gray-600 font-mediu, mt-4'>
            Appointment fee: <span>{currency}
              {isEdit ?
                <input type='number' onChange={(e) => setProfiledata(prev => ({ ...prev, fees: e.target.value }))} value={profiledata.fees} />
                : profiledata.fees}</span>
          </p>
          <div className='flex gap-2 py-2 '>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ?
                <input type='text' onChange={() => setProfiledata((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profiledata.address.line1} />
                : profiledata.address.line1}
              <br />{isEdit ?
                <input type='text' onChange={() => setProfiledata((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profiledata.address.line2} />
                : profiledata.address.line2} </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfiledata(prev => ({ ...prev, available: !prev.available }))} checked={profiledata.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ?
              <button onClick={updateProfile} className='px-4 py-1 border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
              :
              <button onClick={() => setIsEdit(false)} className='px-4 py-1 border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
          }

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
