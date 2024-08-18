import pg from "pg";
import dotenv from "dotenv";
import { request } from "express";
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


// UPDATE
const updateUserEmail = async (request, response, next)=>{
    try{
        const id = request.params.id;
        const reqBody = request.body;
        await client.query(`UPDATE users SET email='${reqBody.email}' WHERE user_id = ${id}`);
        response.status(200).send(`Email updated for user ID: ${id}`);
    }catch(err){
        next(err);
    }
}

const updateUserPassword = async (request, response, next)=>{
    try{
        const id = request.params.id;
        const reqBody = request.body;
        await client.query(`UPDATE users SET password='${reqBody.password}' WHERE user_id = ${id}`);
        response.status(200).send(`Password updated for user ID: ${id}`);
    }catch(err){
        next(err);
    }
}


// DELETE
const deleteUser = async (request, response, next)=>{
    try{
        const id = request.params.id;
        await client.query(`DELETE FROM users WHERE user_id = ${id}`);
        response.status(200).send(`User deleted with user ID: ${id}`);
    }catch(err){
        next(err);
    }
}

// GET
const getUser = async (request, response, next)=>{
    try{
        const id = request.params.id;
        const result = await client.query(`SELECT user_id, username, email, isAdmin FROM users WHERE user_id = ${id}`);
        response.status(200).json(result.rows);
    }catch(err){
        next(err);
    }
}

// GET ALL
const getAllUsers = async (request, response, next)=>{
    try{
        const result = await client.query('SELECT user_id, username, email, isAdmin FROM users');
        response.status(200).json(result.rows);
    }catch(err){
        next(err);
    }
    
}

export {getAllUsers, getUser, updateUserEmail, updateUserPassword, deleteUser};