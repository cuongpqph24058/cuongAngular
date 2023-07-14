import express from 'express';
import { commentall, newComment } from '../controllers/comment';

const router = express.Router()

router.post("/comment",newComment)
router.get("/comments",commentall)

export default router