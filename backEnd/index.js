const http=require('http');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const AuthRoute = require('./src/route/auth.route');
const UserRoute = require('./src/route/user.route');
const CategoryRoute = require('./src/route/category.route');
const BlogRoute = require('./src/route/blog.route');
const CommentRoute = require('./src/route/comment.route');


app.use(cookieParser());
// app.use(express.json());
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
// }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());


const httpServer=http.createServer(app);

const PORT=9005;
const HOST='localhost';

app.use('/api/auth',AuthRoute);
app.use('/api/user',UserRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/blog',BlogRoute);
app.use('/api/comment',CommentRoute);

mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});


httpServer.listen(PORT,HOST,()=>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});

app.use((err, req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})