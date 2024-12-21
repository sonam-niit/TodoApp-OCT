const express= require('express');
const TodoController= require('./routes/todoRoutes');
const app= express();
app.use(express.json()); //convert incoming body data to JSON using JSON Praser
app.get('/',(req,res)=>{
    res.send('Server Localhost is working')
})
app.use('/api',TodoController)
app.listen(5000,()=>console.log('Server Started'))