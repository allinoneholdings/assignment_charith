import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import {connectDB} from "./config/db";
import rootRouter from "./routes/root.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    // origin: process.env.FRONTEND_URL, // enable this later
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1",rootRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });