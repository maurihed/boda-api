import * as express from 'express'
import setGlobalMiddleware from './middleware'
import { restRouter } from './Routes'

const app = express()
setGlobalMiddleware(app)

app.use('/api', restRouter)
// catch all
app.all('*', (req, res) => {
  res.json({error: 'unexpected error'})
})

export default app;
