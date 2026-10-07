import express from 'express';
import { authorizeAdmin, protect } from '../middlewares/auth.middleware.js';
import { adminDeletePost, blockUser, unblockUser } from '../controllers/admin.controller.js';



const router = express.Router();

router.get("/block/:id",protect, authorizeAdmin, blockUser);
router.get("/unblock/:id",protect, authorizeAdmin, unblockUser);
router.get("/post/:id",protect, authorizeAdmin, adminDeletePost);


export default router;

