import * as express from 'express'
import {guestRouter} from './guests.routes'

export const restRouter = express.Router()

restRouter.use('/guests', guestRouter)
