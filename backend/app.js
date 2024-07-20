import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { indexRouter } from './routes/indexRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

export const app = express();

config();
app.use(cors({
    origin: [process.env.BACKEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", indexRouter);

app.use(errorMiddleware);
