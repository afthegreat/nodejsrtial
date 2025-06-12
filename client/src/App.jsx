// App.jsx
import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/home'
import {Login} from './pages/login'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/verifyemail'

const App = () => {
  return (
    <div>
      <h1>hello</h1>
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
