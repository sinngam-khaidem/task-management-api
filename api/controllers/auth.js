import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

dotenv.config();


const client = new pg.Client({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
await client.connect();

// REGISTER
const registerUser = async (request, response, next)=>{
    /**
     * Registers a new user in the database.
     * 
     * Example request.body:
     * {
     *   "username": "exampleUser",
     *   "email": "example@abc.com",
     *   "password": "examplePassword"
     * }
     */
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(request.body.password, salt);
        
        await client.query(`INSERT INTO users (username, email, password) values ('${request.body.username}', '${request.body.email}', '${hash}')`);
        response.status(200).send('New user created.');
    }catch(err){
        next(err);
    }
}

// LOGIN
const loginUser = async (request, response, next)=>{
    /**
    * Logs in a user using their username and password.
    *  
    * - Look for the username in the database.
    * - Get the password corresponding to that username.
    * - Compare the password with the password sent in request.
    * - Create a JWT with isadmin and id in the payload.
    * 
    */
   try{
        const result = await client.query(`SELECT * FROM users WHERE username = '${request.body.username}'`);
        if(result.rows.length == 0)
            return next(createError(404, 'User not found'));

        const isPasswordCorrect = await bcrypt.compare(
            request.body.password,
            result.rows[0].password
        )

        if(!isPasswordCorrect) 
            return next(createError(400, 'Wrong password or username'));

        const token = jwt.sign({
            userId: result.rows[0].user_id,
            isAdmin: result.rows[0].isadmin
        }, process.env.JWT);

        const {isadmin, password, ...otherDetails} = result.rows[0];

        response.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).send({...otherDetails});
        
   }catch(err){
        next(err);
   }

}

export {registerUser, loginUser};