import express from 'express';
import cors from 'cors';
import './loadEnv.js';
import { conn } from './db/conn.js';
import morgan from 'morgan';


import usersRouter from './routes/users.js';
import weatherRouter from './routes/weather.js';
import userProfilesRouter from './routes/userProfiles.js';

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
app.use( '/api/street-ball-weather-conditions', weatherRouter );
app.use( '/api/user-profiles', userProfilesRouter );

app.get( '/', (req, res) => {
  res.send('The heWitUs Backend');
})

app.listen( PORT, () => {
  console.log( `heWitUs backend server running on port ${PORT}`);
})