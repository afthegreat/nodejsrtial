import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const app=express()
const PORT= process.env.PORT || 5003
//url to path allocation
const __filename=fileURLToPath(import.meta.url)
//telling the direcotry of the path
const __dirname=dirname(__filename)
app.use(express.static(path.join(__dirname, '../public')))
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(PORT,()=>
{
    console.log(`server running on port ${PORT}`)
}
    )