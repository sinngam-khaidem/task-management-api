import express from "express";

const route = express.Router();

route.post('/register', registerUser);
route.post('/login', loginUser);


export default route;