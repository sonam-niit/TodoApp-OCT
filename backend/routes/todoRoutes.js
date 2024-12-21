const express = require('express');

const router= express.Router();

router.get('/todos',(req,res)=>{
    res.send({message:"Todo Get method Triggered"})
})
router.post('/todos',(req,res)=>{
    console.log(req.body)
    res.send({message:"Todo Post method Triggered"})
})
router.put('/todos/:id',(req,res)=>{
    console.log('ID: '+ req.params.id)
    res.send({message:"Todo Put method Triggered"})
})
router.delete('/todos/:id',(req,res)=>{
    console.log('ID: '+ req.params.id)
    res.send({message:"Todo Delete method Triggered"})
})

module.exports=router;