import express from 'express';
import multer from 'multer';

const api = express.Router();
const upload  = multer({ storage: multer.memoryStorage() });

/* GET home page. */
api.post('/', upload.single('archivo'), (req, res, next) => {
  console.log(req.file)
  res.status(200).send({message: 'Estás dentrooo!'})
});

module.exports = api;
