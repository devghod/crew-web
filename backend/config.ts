require('dotenv').config();
const port = 4001;
const dbUrl = process.env.DB_URL;

export { port, dbUrl };