import express from 'express'
import db from '../src/db.js'

const router= express.Router()

//get all todos for logged in users
router.get('/',(req,res)=>{ })
//create new to do tasks
router.post('/', (req,res) =>{ })
//update existing to do task
router.put('/:id',(req,res)=>{ })
//delete to do task
router.delete('/:id',(req,res)=>{ })
 
export default router;