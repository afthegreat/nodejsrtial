import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from '../routes/authRoutes.js'
import todoRoutes from '../routes/todoRoutes.js';  // Correct import


const app=express()
const PORT= process.env.PORT ||5003
app.use(express.json())
//url to path allocation
const __filename=fileURLToPath(import.meta.url)
//telling the direcotry of the path
const __dirname=dirname(__filename)
//middleware to tell from where to use the directory
app.use(express.static(path.join(__dirname, '../public')))
//middleware to use json files

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
// routes
app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)


app.listen(PORT,()=>
{
    console.log(`server  on port ${PORT}`)
}
    )