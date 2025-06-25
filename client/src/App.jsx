// App.jsx
import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home.jsx'
import {Login} from './pages/Login.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import VerifyEmail from "./pages/VerifyEmail"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Routes>
         <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/resetpassword'  element={<ResetPassword/>}/>
        <Route path='verifyemail' element={<VerifyEmail/>} />
      </Routes>
    </>
  )
}

export default App
