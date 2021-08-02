import * as express from 'express'
import { GuestController } from '../Controllers/guests.controller'

export const guestRouter = express.Router()

guestRouter.param('id', GuestController.findByParam)

guestRouter.route('/')
  .get(GuestController.getAll)
  .post(GuestController.createOne)

  guestRouter.route('/:id')
  .get(GuestController.getOne)
  .put(GuestController.updateOne)
  .delete(GuestController.deleteOne)
