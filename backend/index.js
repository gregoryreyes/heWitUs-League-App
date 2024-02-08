import express from 'express';

const app = express();
const PORT = process.env.PORT || 4100;

app.listen( PORT, () => {
  console.log( `heWitUs backend server running on port ${PORT}`);
})