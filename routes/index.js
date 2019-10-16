import express from 'express';
import multer from 'multer';
import hummus from 'hummus';

const api = express.Router();
const upload  = multer({ storage: multer.memoryStorage(), onError: (err) => res.status(204).send(err)});

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
api.post('/unirPdf', upload.array('files'), (req, res, next) => {
  console.log(req.files)
  res.status(200).end();
});

module.exports = api;
