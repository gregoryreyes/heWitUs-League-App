import express from 'express';
import cors from 'cors';
import './loadEnv.js';
import { conn } from './db/conn.js';
import morgan from 'morgan';
import usersRouter from './routes/users.js';

conn();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use( cors() ); // Allows frontend to connect to backend
app.use( morgan('dev') ); // HTTP Logger
app.use( express.json() ); // For data in req.body
app.use( express.urlencoded( {extended: true} ) ) // Allow in URL string

// Routes
app.use( '/api/users', usersRouter );

app.get( '/', (req, res) => {
  res.send('The heWitUs Backend');
})

app.listen( PORT, () => {
  console.log( `heWitUs backend server running on port ${PORT}`);
})