import express  from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from "cookie-session";
import cors from 'cors';
import { createChargeRouter } from "./routes/new";

import { errorHandler, NotFoundError, currentUser } from "@ser0710_tic/common";


const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser)

app.use(createChargeRouter)

app.use(errorHandler);

export { app };