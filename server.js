import app from './src/index.js'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`😎 O sistema está executando em http://localhost:${port}`)
});
