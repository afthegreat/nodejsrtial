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
//authentication endpoint controll
router.post('/login', (req,res)=>{
  //accepting username and password written by the client
  const {username, password}=req.body
  try{
    //fetching the all datas from database by inserted username
    const getUser=db.prepare('SELECT * FROM users WHERE username=?')
    const user=getUser.get(username)
    if (!user){
        return res.status(404).send({message: "user not found"})
    }
    //comaparing the password inserted and password on database
  const passordIsvalid= bcrypt.compareSync(password, user.password)
  if(!passordIsvalid){
    return res.status(404).send({message: 'invalid password inserted'})
  }
  const token=jwt.sign({id: user.id}, process.env.JWT_SECRET,
    {expiresIn:'24h'})
    res.json({token})
  }
  catch (err){
    console.log(err.message)
    res.sendStatus(500)
  }
})


// to get register files in the temporary database
router.get('/fetch-users', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all(); // Get all registered users from the temporary in-memory DB

    console.log("📋 Registered Users:");
    console.table(users); // Prints users in a nice table format in the console

    res.json(users); // Still send back the response if you want to check from frontend too
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.sendStatus(500);
  }
});



export default router