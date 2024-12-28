const request= require('supertest');//imported req for supertest for api test
const mongoose= require('mongoose');//db import
const app= require('../serverForTestCase');//app server which we have created
const Todo= require('../models/todo'); //model for testing
//DB Connection with diff test DB
beforeAll(async()=>{
    await mongoose.connect('mongodb://localhost:27017/pwtodoapp-test')
})
afterEach(async()=>{
    await Todo.deleteMany({});//delete all existing data
})
afterAll(async()=>{
    await mongoose.connection.close();
})
//Test Suite
describe('Todo API tests',()=>{
    test('POST /api/todos - should create new Todo',async()=>{
        const newTodo= {taskName:'Check Papers'}
        const response = await request(app).post('/api/todos')
        .send(newTodo).expect(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.taskName).toBe(newTodo.taskName);
        expect(response.body.status).toBe(false);
    })
    test('Get /api/todos - should return all todos',async()=>{
        const todo1= new Todo({taskName:'Task 1'});
        const todo2= new Todo({taskName:'Task 2'});
        await todo1.save();
        await todo2.save();

        const response = await request(app).get('/api/todos').expect(200);

        expect(response.body.length).toBe(2);
    })
    test('PUT /api/todos -should update the todo with status TRUE',async()=>{
        //Step 1: insert new todo
        const todo= new Todo({taskName:'Sample Task'});
        await todo.save();
        //Update the status
        const updatedStatus= {status:true};
        const response= await request(app).put(`/api/todos/${todo._id}`)
        .send(updatedStatus).expect(200);

        //Verify the responses
        expect(response.body._id).toBe(todo._id.toString());
        expect(response.body.taskName).toBe(todo.taskName);
        expect(response.body.status).toBe(true);

    })
    //Task: Write TestCase for Delete API to test
    //What if We are getting error while testing the data
    //How to verify Data validation with error
    test('POST /api/todos - should not create todo with empty value',async()=>{
        const response = await request(app).post('/api/todos')
        .send({}).expect(500); //Validation error

        expect(response.body.message).toBe('Error while creating todo');
    })
})