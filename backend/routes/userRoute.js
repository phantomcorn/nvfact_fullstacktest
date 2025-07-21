/*  
    PREV: frontend requests
    NEXT: controllers/userController.js

    Any request to <BASE_URL>/users is further directed to the correct backend logic here
*/
import express from "express"
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/userController.js"
const router = express.Router();

router.get("/", getUsers)
router.post("/", addUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router