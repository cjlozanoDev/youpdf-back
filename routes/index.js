import express from 'express';
const api = express.Router();

/* GET home page. */
api.get('/', function(req, res, next) {
  res.status(200).send({message: 'Estás dentrooo!'})
});

module.exports = api;
