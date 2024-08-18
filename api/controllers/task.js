import pg from "pg";
import dotenv from "dotenv";
import { request, response } from "express";
dotenv.config();


const client = new pg.Client({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
await client.connect();

// CREATE
const createTask = async (request, response, next)=>{
    const user_id = request.params.user_id;
    const reqBody = request.body;
    try{
        await client.query(`INSERT INTO tasks (user_id, task_title, task_desc) VALUES (${user_id}, '${reqBody.task_title}', '${reqBody.task_desc}')`);
        response.status(200).send(`New task successfully created for user ID: ${user_id}`);
    }catch(err){
        next(err);
    }
}

// UPDATE
const updateTaskTitle = async (request, response, next)=>{
    const task_id = request.params.id;
    const reqBody = request.body;
    try{
        await client.query(`UPDATE tasks SET task_title = '${reqBody.task_title}' WHERE task_id = ${task_id}`);
        response.status(200).send(`Updated task title with ID: ${task_id}`);
    }catch(err){
        next(err);
    }
}

const updateTaskDesc = async (request, response, next)=>{
    const task_id = request.params.id;
    const reqBody = request.body;
    try{
        await client.query(`UPDATE tasks SET task_desc = '${reqBody.task_desc}' WHERE task_id = ${task_id}`);
        response.status(200).send(`Updated task description with ID: ${task_id}`);
    }catch(err){
        next(err);
    }
}

const updateTaskStatus = async (request, response, next)=>{
    const task_id = request.params.id;
    const reqBody = request.body;
    try{
        await client.query(`UPDATE tasks SET isCompleted = ${reqBody.isCompleted} WHERE task_id = ${task_id}`);
        response.status(200).send(`Updated task status with ID: ${task_id}`);
    }catch(err){
        next(err);
    }
}

// DELETE
const deleteTask = async (request, response, next)=>{
    const task_id = request.params.id;
    try{
        await client.query(`DELETE FROM tasks WHERE task_id = ${task_id}`);
        response.status(200).send(`Deleted task with ID: ${task_id}`);
    }catch(err){
        next(err);
    }
}

// GET
const getTask = async (request, response, next)=>{
    try{
        const id = request.params.id;
        const result = await client.query(`SELECT * FROM users WHERE task_id = ${id}`);
        response.status(200).json(result.rows);
    }catch(err){
        next(err);
    }
}

// GET ALL TASK BY User id
const getTaskByUserId = async (request, response, next)=>{
    try{
        const user_id = request.params.user_id;
        const result = await client.query(`SELECT U.username, T.task_id, T.task_title, T.task_desc, T.isCompleted, T.created_at FROM users U JOIN tasks T ON U.user_id = T.user_id WHERE U.user_id=${user_id}`);
        response.status(200).json(result.rows);
    }catch(err){
        next(err);
    } 
}

// GET ALL
const getAll = async (request, response, next)=>{
    try{
        const result = await client.query('SELECT * FROM tasks');
        response.status(200).json(result.rows);
    }catch(err){
        next(err);
    }
    
}

export {getAll, getTask, getTaskByUserId, createTask, updateTaskDesc, updateTaskTitle, updateTaskStatus, deleteTask};