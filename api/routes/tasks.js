import express from "express";
import { getAll, getTask, getTaskByUserId } from "../controllers/task.js";

const route = express.Router();

route.get("/taskByUser/:user_id", getTaskByUserId);
route.get("/:id", getTask);
route.get("/", getAll);

export default route;