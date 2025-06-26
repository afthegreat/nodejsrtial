import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const VerifyEmail = () => {
  const navigate = useNavigate();
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
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      <form className='bg-slate-900 p-8 rounded-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-800'>Enter the OTP sent to your email</p>

        <div className='flex justify-between mb-8'>
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
          className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
