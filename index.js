'use strict'
import app from './app';
import config from './config';
import cors from 'cors';


app.listen(config.port, () => {
  console.log(`API REST corriendo en el http://localhost:${config.port}`)
})

