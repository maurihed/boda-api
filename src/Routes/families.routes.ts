import * as express from 'express'
import { FamiliesController } from '../Controllers/families.controllers'

export const familyRouter = express.Router()

familyRouter.param('id', FamiliesController.findByParam)

familyRouter.route('/')
  .get(FamiliesController.getAll)
  .post(FamiliesController.createOne)

familyRouter.route('/:id')
  .get(FamiliesController.getOne)
  .put(FamiliesController.updateOne)
  .delete(FamiliesController.deleteOne)

familyRouter.route('/:id/guests')
  .get(FamiliesController.getFamilyGuests)
