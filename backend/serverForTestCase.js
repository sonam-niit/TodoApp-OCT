const express= require('express');
const TodoController= require('./routes/todoRoutes');

const app= express();
app.use(express.json()); 
//set up routes
app.get('/',(req,res)=>{
    res.send('Server Localhost is working')
})
app.use('/api',TodoController)

module.exports=app; //export this app to use for test cases
