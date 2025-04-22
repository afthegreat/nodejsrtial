import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../src/db.js'

const router =express.Router()
router.post('/register',(req,res)=>{
    const {username,password}=req.body
    const hashedpassword=bcrypt.hashSync(password,8)
    console.log(hashedpassword)
   
})
router.post('/login', (req,res)=>{
  
})

export default router