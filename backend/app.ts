import express, { Request, Response } from 'express';
import { port } from './config';
const cors = require('cors');
const indexts = require("./index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const result = indexts.welcomeFunction();
  console.log(`Hello World! ${result}`);
  res.send(`Hello World! ${result}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});