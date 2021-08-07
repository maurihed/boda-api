import * as express from 'express'
import {guestRouter} from './guests.routes'
import {familyRouter} from './families.routes'
import { apiErrorHandler } from './errorHandler'

export const restRouter = express.Router()

restRouter.use('/guests', guestRouter)
restRouter.use('/families', familyRouter)
restRouter.use(apiErrorHandler)
