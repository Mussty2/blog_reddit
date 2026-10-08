import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import postRoutes from './routes/post.route.js';
import authRoutes from "./routes/auth.route.js";
import commentRoutes from "./routes/comment.route.js";

dotenv.config()

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended : true}))
app.use(express.json())

//Routes
app.use('/api/post', postRoutes);  // http://localhost:5000/api/post/add-post

app.use('/api/auth', authRoutes);  // http://localhost:5000/api/users/add-user

app.use('/api/comment', commentRoutes);  // http://localhost:5000/api/comment

connectDB()
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`SERVER RUNNING  ON PORT ${PORT}`))