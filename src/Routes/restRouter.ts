import * as express from 'express'
import {guestRouter} from './guests.routes'
import { apiErrorHandler } from './errorHandler'

export const restRouter = express.Router()

restRouter.use('/guests', guestRouter)
restRouter.use(apiErrorHandler)
