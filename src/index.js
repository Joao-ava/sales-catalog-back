import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDatabase from './config/database.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/user.js'
import storeRouter from './routes/store.js'

const app = express()

;(async () => {
  dotenv.config()

  app.use(cors())
  app.use(express.json())

  app.use(authRouter);
  app.use('/users', usersRouter);
  app.use('/stores', storeRouter)

  await connectDatabase()

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`😎 O sistema está executando em http://localhost:${port}`)
  })
})()
