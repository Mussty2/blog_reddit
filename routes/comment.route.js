import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addComment, deleteComment, getComments } from '../controllers/comment.controller.js';


const router = express.Router();

router.get("/:id", getComments);
router.post("/:id",protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router;

