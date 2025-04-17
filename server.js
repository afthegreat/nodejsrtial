const express= require('express')
const app=express()
const PORT=8080

//add HTTP verbs and routes or paths
//method informs the nature of request and the route is a further subdirectory 
app.get('/', (req, res)=> {
    //end point 1
    console.log('end point hitted', req.method)
    res.send('<h1>this is a trial website</h1>')
} )
app.get('/dashboard', (req,res)=>{
    console.log('i hit the dashboard', req.method)
    res.send('hi')
})
app.listen(PORT, () => console.log(`server running  on port ${PORT}`))