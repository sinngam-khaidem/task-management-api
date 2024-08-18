import express from "express";
import { deleteUser, getAllUsers, getUser, updateUserEmail, updateUserPassword } from "../controllers/user.js";

const route = express.Router();

route.put("/email/:id", updateUserEmail);
route.put("/pw/:id", updateUserPassword);
route.delete("/:id", deleteUser);
route.get("/:id", getUser);
route.get("/", getAllUsers);

export default route;