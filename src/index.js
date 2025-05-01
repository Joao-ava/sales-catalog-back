import express from 'express'
import dotenv from 'dotenv'

import connectDatabase from './config/database.js';

const app = express()

;(async () => {
  dotenv.config()
  await connectDatabase()

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`😎 O sistema está executando em http://localhost:${port}`)
  })
})()
