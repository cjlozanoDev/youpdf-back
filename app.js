
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/index';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded( {limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'}))

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/', api);

module.exports = app;
