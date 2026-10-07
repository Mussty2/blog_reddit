import express from 'express';
import { createPost, deletePost, dislikePost, getAll, getSinglePost, likePost, updatePost } from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';


const router = express.Router();

router.post('/add-post',protect, upload.single("image"), createPost);
router.get('/all', getAll);
router.get("/:id", getSinglePost)
router.put("/update/:id",protect, updatePost);
router.delete("/:id",protect, deletePost)
router.put("/like/:id",protect, likePost)
router.put("/dislike/:id",protect, dislikePost)

export default router;

