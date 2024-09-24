require('dotenv').config();

const port = 4001;
const dbUrl = process.env.DB_URL;
const nodeEnv = process.env.NODE_ENV;

export { port, dbUrl, nodeEnv };