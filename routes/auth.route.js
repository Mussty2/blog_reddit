import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { getAll } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/users", getAll);

export default router;

