import express from 'express';
import routes from './routes/route.js';
import connection from './database/db.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());

dotenv.config();

const port = 3000;

app.use('/', routes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connection(username, password);

app.listen(3000, () => {
    console.log(`Server is running on ${port}`);
})