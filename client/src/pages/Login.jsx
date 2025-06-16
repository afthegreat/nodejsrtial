import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate= useNavigate()

  const [state, setstate]=useState('Sign Up')
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')


  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0
    bg-gradient-to-br from-blue-200 to-puple-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 
      top-5 w-28 sm:w-32 cursor-pointer '/>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full
      sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==='Sign Up' ? 'Create account': 'Login'}</h2>
     
        <p className='text-center text-sm mb-6'>   {state==='Sign Up' ? 'Create your account': 'Login to your account'}
        </p>  
        <form>
          {state==='Sign Up'&& (       
               <div className='flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person_icon} alt=''/>
            <input onChange={e=>setName(e.target.value)}
            value={name}
            type='text' placeholder='Full name' required
            className='bg-transparent outline-none'/>
          </div>)}

           <div className='flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt=''/>
            <input onChange={e=>setEmail(e.target.value)}
            value={email}
            type='email' placeholder='Email id' required
            className='bg-transparent outline-none'
 />
          </div>
           <div className='flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt=''/>
            <input type='password' onChange={e=>setPassword(e.target.value)}
            value={password}
            placeholder='Password' required
            className='bg-transparent outline-none'
 />
          </div>
          {state==='Login' && ( 
            <p onClick={()=>navigate('/resetpassword')} className='mb-4 text-indigo-500 cursor-pointer'>Forget password</p>)}
         
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
          </form> 
          {state==='Sign Up' ? ( <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
            <span onClick={()=> setstate('Login')} className='text-blue-400 underline cursor-pointer'> Login here
              </span>
              </p>  ): 
              (  <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
            <span onClick={()=> setstate('Sign Up')} className='text-blue-400 underline cursor-pointer'> Signup
              </span>
              </p>   )}
         
         
      </div>
    </div>
  )
}


