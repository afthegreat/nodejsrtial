import express from 'express'
import db from '../src/db.js'
import authMiddleware from '../src/middleware/authMiddleware.js';
import prisma from '../prismaClient.js';

const router= express.Router()

//get all todos for logged in users
router.get('/', async(req, res) => {
    const todo= await prisma.Todo.findMany({
        where:{
           userId:req.userId 
        }
    })
    try {
        res.json(todos);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

//create new to do tasks
router.post('/', async(req,res) =>{
const {task}=req.body

const todo= await prisma.Todo.create({
  data:{
    task, userId:req.userId
  }
})
res.json ({id: result.lastInsertRowid , task, completed: 0})

 })
//update existing to do task
router.put('/:id',async(req,res)=>{
const {completed}=req.body
const {id}=req.params
const {page}=req.query

const updatedTodo= await prisma.Todo.update({
    
        where:{
            id:parseInt(id),
            userId:req.userId
        },
        data:{
        completed:!!completed
        }
    
})
res.json({messege: "Todo completed"})


 })
//delete to do task
router.delete('/:id',async (req,res)=>{
    const {id}=req.params
    const userId=req.userId
    
    await prisma.Todo.delete({
        where: {
        id:parseInt(id),
        userId: req.userId
        }
        
    })

    res.status(200).json({message: "deleting done"})
 })
 




//fetch all todo datas

  
  
export default router;
