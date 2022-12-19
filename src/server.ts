import 'reflect-metadata';

import express from 'express';
import routes from './routes'
import cors from "cors"

import './database';
import './container';

const PORT = process.env.PORT || 8080
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});