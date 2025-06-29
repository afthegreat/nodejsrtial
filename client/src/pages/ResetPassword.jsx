import React, { useState, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const ResetPassword = () => {
  const {backendUrl}= useContext(AppContent)
  axios.defaults.withCredentials =true 

  const navigate= useNavigate()
  const [email,setEmail]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [isEmailSent, setIsEmailSent]=useState('')
  const [otp,setOtp]=useState(0)
  const [isOtpSubmitted,setOtpSubmitted]=useState(false)

  const inputRefs = useRef([]);
  

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      e.target.value = ''; // only allow digits
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }
const handlePaste = (e) => {
  const paste = e.clipboardData.getData('text');
  const pasteArray = paste.replace(/\D/g, '').split(''); // only digits

  pasteArray.forEach((char, index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = char;
    }
  });
};

const onSubmitEmail= async(e)=>{
   e.preventDefault()
   try {
    const {data}= await axios.post(backendUrl + '/api/auth/sendresetotp', {email})
    data.success ? toast.success(data.message) : toast.error(data.message)
    data.success&&setIsEmailSent(true)
    
   } catch (error) {
    toast.error(error.message)
    
   }
}

const onSubmitOtp= async(e)=>{
  e.preventDefault()
  const otpArray= inputRefs.current.map(e=> e.value)
  setOtp(otpArray.join(''))
setOtpSubmitted(true)
}

const onSubmitNewPassword= async (e)=>{
  e.preventDefault()
  try {
    const {data}= await axios.post(backendUrl+'/api/auth/resetpassword',{email,otp,newPassword})
    data.success? toast.success(data.message) :toast.error(data.message)
    data.success && navigate('/login')
  } catch (error) {
    toast.error(error.message)
  }
}

  return (
    
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      {/* // reset emial insertion form */}
      {!isEmailSent && 
        <form onClick={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <div className='mb-1 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333a5c]'>
          <img src={assets.mail_icon} alt='email' className='w-5 h-5'/>
          <input
            type='email'
            className='bg-transparent outline-none focus:outline-none focus:ring-0 w-full text-white placeholder:text-gray-400'
            placeholder='Email address'
            value={email} onChange={e=>{
            setEmail(e.target.value)
            }}
          /></div>
            <div className='flex justify-center mt-4'>
              <button
                type="submit"
                className='py-2 px-15 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer'
              >
                Submit
              </button>
            </div>
        </form>
}

{/* otp fill form */}
{!isOtpSubmitted && isEmailSent &&
    <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
        <p className='text-center mb-6 text-indigo-800'>Enter the OTP sent to your email</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className='w-12 h-12 bg-[#333A5C] text-white text-xl rounded-md text-center'
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              required
            />
          ))}
        </div>
                <button 
          type="submit"
          className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer '
        >
          Reset Password
        </button>
        </form>
        }
        
        {/* new password inserton form */}
        {isOtpSubmitted && isEmailSent &&
         <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
                <p className='text-center mb-6 text-indigo-800'>Enter the new password below</p>
        <div className='mb-1 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333a5c]'>
          <img src={assets.lock_icon} alt='email' className='w-5 h-5'/>
          <input
            type='password'
            className='bg-transparent outline-none focus:outline-none focus:ring-0 w-full text-white placeholder:text-gray-400'
            placeholder='New Password'
            value={newPassword} onChange={e=>{
              setNewPassword(e.target.value)
            }} />
            </div>
                <button 
          type="submit"
          className='w-30 py-2 mt-3 ml-25  bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer '
        >
          Submit
        </button>
        
        </form>
        }
      </div>
  )
}

export default ResetPassword
