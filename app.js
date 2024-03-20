import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";



const app = express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
    origin : [process.env.FRONTEND_URL] ,
    methods : ["GET","POST","DELETE","PUT"],
    credentials : true
})); // use for middleware

app.use(cookieParser());  // user token authorized by cookiparser
app.use(express.json());  // use only for parsing json data 
app.use(express.urlencoded({extended:true})); // convert string to json formate
app.use(fileUpload({
    useTempFiles : true,       // upload file purpose it used 
    tempFileDir:"/tmp/",
}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRouter)



export default app ;