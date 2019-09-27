
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './routes/index';

const app = express();

app.use(bodyParser.urlencoded( {extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.use('/', api);

module.exports = app;
