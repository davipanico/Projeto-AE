import 'reflect-metadata';

import express from 'express';
import routes from './routes'
import cors from "cors"

import './database';
import './container';

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const PORT = process.env.PORT || 8080
const app = express();

app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});