
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/index';

const app = express();

app.use(bodyParser.urlencoded( {limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'}))

app.use('/', api);

module.exports = app;
