import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import taskRoute from "./routes/tasks.js";

dotenv.config();

const port = process.env.SERVER_PORT;

const app = new express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoute);
app.use('/tasks', taskRoute);



app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(errorStatus).json({
        "status": "failed",
        "errorStatus": errorStatus,
        "errorMessage": errorMessage,
        "stack": err.stack
    })
})


app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
});