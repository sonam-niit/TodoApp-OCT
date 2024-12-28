const express = require('express');
const Todo = require('../models/todo');

const router= express.Router();

router.get('/todos',async(req,res)=>{
    try {
        const todos= await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message:'Error while fetching todo',error})
    }
})
router.post('/todos',async(req,res)=>{
    try {
        const {taskName}=req.body;
        const newTodo= new Todo({taskName});
        await newTodo.save(); //store todo in db
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({message:'Error while creating todo',error})
    }
})
router.put('/todos/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const updatedTodo=await Todo.findByIdAndUpdate(id,{status:true},{new:true});
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message:'Error while updating todo',error})
    }
})
router.delete('/todos/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({message:'Todo Deleted successfully'});
    } catch (error) {
        res.status(500).json({message:'Error while deleting todo',error})
    }
})

module.exports=router;