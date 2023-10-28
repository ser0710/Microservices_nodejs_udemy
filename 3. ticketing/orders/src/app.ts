import express  from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from "cookie-session";
import cors from 'cors';

import { errorHandler, NotFoundError, currentUser } from "@ser0710_tic/common";

import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser)

app.use(deleteOrderRouter)
app.use(indexOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)


app.use(errorHandler);

export { app };