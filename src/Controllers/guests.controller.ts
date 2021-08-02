import { Request, Response, NextFunction } from "express";
import Guest from "../modules/guests/models";
import GuestsService from "../services/guests.service";

const guestService = new GuestsService()

interface GuestRequest extends Request {
  guestFromId: Guest;
}

export const GuestController = {
  findByParam: (req: GuestRequest, res: Response, next: NextFunction, id: any): void => {
    console.log('ID: ', id, typeof id);
    guestService.getGuestById(id)
    .then((guest) => {
      if(!guest) {
        next(new Error('Not Found Error'))
      } else {
        req.guestFromId = guest;
        next()
      }
    })
    .catch(error => next(error))
  },
  getAll: (req: Request, res: Response, next: NextFunction): void => {
    guestService.getAll()
    .then(guests => res.status(201).json(guests))
    .catch(error => next(error))
  },
  createOne: (req: Request, res: Response, next: NextFunction): void => {
    guestService.createOne(req.body)
    .then(guests => res.status(201).json(req.body))
    .catch(error => next(error))
  },
  getOne: (req: GuestRequest, res: Response, next: NextFunction) => {
    guestService.getOne(req.guestFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
  },
  updateOne: (req: GuestRequest, res: Response, next: NextFunction) => {
    const guestToUpdate = req.guestFromId
    const update = req.body
    guestService.updateOne(guestToUpdate, update)
    .then(guest => res.status(201).json(guest))
    .catch(error => next(error))
  },
  deleteOne: (req: GuestRequest, res: Response, next: NextFunction) => {
    guestService.deleteOne(req.guestFromId)
    .then(guest => res.status(201).json(guest))
    .catch(error => next(error))
  }
}
