const express= require('express');
const mongoose= require('mongoose');
const TodoController= require('./routes/todoRoutes');
//DB Connection //pwtodoapp is the DB name
mongoose.connect('mongodb://localhost:27017/pwtodoapp')
.then(()=>console.log('DB Connected'))
.catch((err)=>console.log('Error Occured',err))

const app= express();
app.use(express.json()); //convert incoming body data to JSON using JSON Praser
app.get('/',(req,res)=>{
    res.send('Server Localhost is working')
})
app.use('/api',TodoController)
app.listen(5000,()=>console.log('Server Started'))