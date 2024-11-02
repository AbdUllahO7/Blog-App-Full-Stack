import express  from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import path from "path"
import cors from "cors"
// routes 
import userRoutes from './routes/UserRoutes'
import postRoutes from './routes/PostRoutes'
import commentRoute from './routes/CommentRoute'
import categoryRoute from './routes/PostCategoiesRoutes';

import newsRoute from './routes/NewsRoute'
import userArticleRoute from './routes/UserArticleRoute'


import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";

dotenv.config();
connectDB()
const app = express();
app.use(express.json());
app.use(cors())

app.get('/' , (req, res) => {
    res.send("server is running")
});

app.use('/api/users' , userRoutes)
app.use('/api/posts' , postRoutes)
app.use('/api/comments' , commentRoute)
app.use('/api/post-categories' , categoryRoute)

app.use('/api/news' , newsRoute)
app.use('/api/userArticle' , userArticleRoute)


// static assets 
app.use('/uploads/', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(invalidPathHandler);
app.use(errorResponseHandler);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
const PORT = process.env.PORT || 5000 ; 


app.listen(PORT , ()=> console.log(`server is running on port ${PORT}`)); 