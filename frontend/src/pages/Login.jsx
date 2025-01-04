import React, { useState } from 'react'

const Login = () => {


  const [state,setstate]=useState('Sign Up');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const onSubmitHandler=()=>{
    event.preventDefault()

  }
  return (
    <form className='min-h-[80vh] flex items-center' action="">
         <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up'? "Create account":"Login"}</p>
          <p>Please {state ==='Sign Up' ? "sign up" :"log in"}</p>
           {
            state==='Sign Up'
             && 

              <div className='w-full'>
                <p>Full Name</p>
                <input className='border border-zinc-300 rounded w-full p-2' type="text" onChange={(e)=>setName(e.target.value)} />
              </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2' type="email" onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2' type="password" onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className='bg-primary text-white  w-full py-2 rounded-md text-base'>{state==='Sign Up'? "Create account":"Login"}</button>
          {
            state==='Sign Up'
            ? <p>Already have an account? <span onClick={()=>setstate('Login')} className='text-primart underline cursor-pointer'>Login here</span></p>
            : <p> Create an new account? <span onClick={()=>setstate('Sign Up')} className='text-primart underline cursor-pointer'>click here</span></p>
          }
         </div>
    </form>
  )
}

export default Login
