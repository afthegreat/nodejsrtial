// App.jsx
import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/home'
import {Login} from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/verifyemail'

const App = () => {
  return (
    <div>
 
      <Routes>
         <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/resetpassword'  element={<ResetPassword/>}/>
        <Route path='verifyemail' element={<VerifyEmail/>} />
      </Routes>
    </div>
  )
}

export default App
