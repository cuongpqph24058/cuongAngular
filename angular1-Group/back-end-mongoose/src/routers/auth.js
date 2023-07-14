import express from 'express';
import {signin,signup,users,updateUser,removeUser,user} from '../controllers/auth'

const router = express.Router()

router.post("/signup",signup)
router.post("/signin",signin)


router.get("/users",users)
router.get("/users/:id",user)
router.put("/users/:id",updateUser)
router.delete("/users/:id",removeUser)
export default router