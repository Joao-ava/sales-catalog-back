import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDatabase from './config/database.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/user.js'
import storeRouter from './routes/store.js'
import productsRouter from './routes/product.js'
import imagesRouter from './routes/imagem.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/stores', storeRouter)
app.use('/products', productsRouter)
app.use('/images', imagesRouter)
app.use('/uploads', express.static('uploads'))

connectDatabase()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('API Sales Catalog está online!');
});

// app.listen(port, () => {
//   console.log(`😎 O sistema está executando em http://localhost:${port}`)
// });
export default app
