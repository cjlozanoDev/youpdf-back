
import express from 'express';
import api from './routes/index';

const app = express();

app.use('/', api);

module.exports = app;
