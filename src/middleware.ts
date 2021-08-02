import * as compression from 'compression'
import * as express from 'express'

const setGlobalMiddleware = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(compression());
}

export default setGlobalMiddleware
