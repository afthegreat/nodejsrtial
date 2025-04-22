const express= require('express')
const app=express()
const PORT=8080

let data=['james']
app.use(express.json())
//add HTTP verbs and routes or paths
//method informs the nature of request and the route is a further subdirectory 
app.get('/', (req, res)=> {
    //end point 1
    res.send(`<body style="background:pink ; color:blue">
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        </body>`)
} )
app.get('/dashboard', (req,res)=>{
    console.log('i hit the dashboard', req.method)
    res.send('hi')
})
app.get('/api/data', (req, res)=>{
    console.log('this one was for data')
    res.send(data)
})
app.post('/api/data', (req, res)=>{
   const newEntry=req.body 
   console.log(newEntry)
   data.push(newEntry.name)
   res.sendStatus(201)
})
app.delete('/api/data', (req, res)=> {
   data.pop()
   console.log('we have removed the last element of teh array')
   res.sendStatus(200) 
})
app.listen(PORT, () => console.log(`server running  on port ${PORT}`))