import express from 'express'
import db from '../src/db.js'
import authMiddleware from '../src/middleware/authMiddleware.js';
const router= express.Router()

//get all todos for logged in users
router.get('/', (req, res) => {
    const gettodo = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    
    console.log('on the way');

    try {
        const todos = gettodo.all(req.userId); // req.userId should be set from some middleware
        console.log('all users are working')
        res.json(todos);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

//create new to do tasks
router.post('/', (req,res) =>{
const {task}=req.body
const insertTodo= db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
const result=insertTodo.run(req.userId, task)
res.json ({id: result.lastInsertRowid , task, completed: 0})

 })
//update existing to do task
router.put('/:id',(req,res)=>{
const {completed}=req.body
const {id}=req.params
const {page}=req.query

const updatedTodo=db.prepare('UPDATE todos SET completed=? WHERE id=?')
updatedTodo.run(completed,id)
res.json({messege: "Todo completed"})


 })
//delete to do task
router.delete('/:id',(req,res)=>{
    const {id}=req.params
    const userId=req.userId
    const deleteTodo=db.prepare('DELETE FROM todos WHERE id=? AND user_id=?')
    deleteTodo.run(id, userId)
    res.status(200).json({message: "deleting done"})
 })
 




//fetch all todo datas

  
  
export default router;
