import app from './server'

const {
  PORT = 3000,
} = process.env

app.listen(PORT, () => {
  console.log('server started at http://localhost:'+PORT);
})
