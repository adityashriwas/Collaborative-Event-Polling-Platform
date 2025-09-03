import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import eventRoute from './routes/event.route.js';

dotenv.config();

// call database connection here
connectDB();

const app = express();
const _dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.options("*", cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());


//api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/event", eventRoute);



app.get("/", (req, res) => {
    res.send("API is running ✅");
})

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);    
})

