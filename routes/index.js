import express from 'express';
import multer from 'multer';
import hummus from 'hummus';

const api = express.Router();
const upload  = multer({ storage: multer.memoryStorage() });

/* GET home page. */
api.post('/dividirPdf', upload.single('filePDF'), (req, res, next) => {
  const buffer64 = Buffer.from(req.file.buffer);
  const pdfFile = new hummus.PDFRStreamForBuffer(buffer64);
  const pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
  pdfWriter.appendPDFPagesFromPDF(pdfFile, {type: hummus.eRangeTypeSpecific, specificRanges: [ [ 0, 2] ]});
  pdfWriter.end();
  res.status(200).end();
});

module.exports = api;
