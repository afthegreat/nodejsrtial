import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../src/db.js'

const router =express.Router()
//end point that handles requestes for registration
router.post('/register',(req,res)=>{
    console.log('Received body:', req.body)
    //accepts the usen name and password from front end or requester
    const {username,password}=req.body
    //encrypts the password through bcrypt
    const hashedpassword=bcrypt.hashSync(password,8)
   try{
    //adding new user to the database
const insertUser=db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`)
const result=insertUser.run(username,hashedpassword)
//add first to do task for each user
const defaultTodo='Hello :) Add your first todo! '
const insertTodo= db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`)
   insertTodo.run(result.lastInsertRowid, defaultTodo)

   //create a token
   const token=jwt.sign({ id: result.lastInsertRowid}, process.env.
    JWT_SECRET,{expiresIn:'24h'}
   )
   res.json({token})
}
   catch(err){
    console.log(err.message)
    res.sendStatus(400)
   }
   
})
router.post('/login', (req,res)=>{
  
})

export default router