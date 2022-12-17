import 'reflect-metadata';

import express from 'express';
import routes from './routes'

import './database';
import './container';

const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});