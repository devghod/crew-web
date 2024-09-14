import { Request, Response } from 'express';
import { port } from './src/configs/config';
import { connectToDatabase } from './src/configs/db.config';

const cors = require('cors');
const indexts = require("./index");
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
  const result = indexts.welcomeFunction();
  console.log(`Hello World! ${result}`);
  res.status(200).send(`Hello World! ${result}`);
});

const authRoute = require("./src/routes/auth.route");
app.use('/api/auth', authRoute);

const userRoute = require("./src/routes/user.route");
app.use('/api/user', userRoute);

const debtRoute = require("./src/routes/debt.route");
app.use('/api/debt', debtRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});