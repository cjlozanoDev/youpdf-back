import express from 'express';
import multer from 'multer';
import hummus from 'hummus';

const api = express.Router();
const upload  = multer({ storage: multer.memoryStorage()});
const uploadArray = multer({ storage: multer.memoryStorage()}).array('files');

/* GET home page. */
api.post('/dividirPdf', upload.single('filePDF'), (req, res, next) => {
  const rango = JSON.parse(req.body.rango);
  const desde = rango.desde - 1;
  const hasta = rango.hasta - 1;
  const buffer64 = Buffer.from(req.file.buffer);
  const pdfFile = new hummus.PDFRStreamForBuffer(buffer64);
  const pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
  pdfWriter.appendPDFPagesFromPDF(pdfFile, {type: hummus.eRangeTypeSpecific, specificRanges: [ [ desde, hasta] ]});
  pdfWriter.end();
  res.status(200).end();
});

api.post('/unirPdf', (req, res, next) => {
  let archivos = [];
  uploadArray(req, res, err => {
    if (err) {
      res.status(400).send({
        message: 'error',
        error: err
      })
    } else {
      archivos = req.files;
      const pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
      let pdfFile = '';
      let buffer64 = '';
      for (let i = 0 ; i < archivos.length; i += 1) {
        buffer64 = Buffer.from(archivos[i].buffer);
        pdfFile = new hummus.PDFRStreamForBuffer(buffer64);
        console.log(pdfFile);
        pdfWriter.appendPDFPagesFromPDF(pdfFile); 
      }
      pdfWriter.end();
      res.status(200).end();
    }
  })
});

module.exports = api;
