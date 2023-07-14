import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import foodRouter from "./routers/food"
import userRouter from "./routers/auth"
import commentRouter from "./routers/comment"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",foodRouter)
app.use("/api",userRouter)

mongoose.connect(`mongodb://127.0.0.1:27017/meal`);


export const viteNodeApp = app;
