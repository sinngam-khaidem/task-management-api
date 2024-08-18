import express from "express";
import { getAll, getTask, getTaskByUserId, createTask, updateTaskTitle, updateTaskStatus, updateTaskDesc, deleteTask } from "../controllers/task.js";

const route = express.Router();

route.post("/:user_id", createTask);
route.put("/title/:id", updateTaskTitle);
route.put("/desc/:id", updateTaskDesc);
route.put("/status/:id", updateTaskStatus);
route.delete("/:id", deleteTask);
route.get("/taskByUser/:user_id", getTaskByUserId);
route.get("/:id", getTask);
route.get("/", getAll);

export default route;