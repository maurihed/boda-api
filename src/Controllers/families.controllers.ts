import { Request, Response, NextFunction } from "express";
import Family from "../modules/families/models";
import Guest from "../modules/guests/models";
import FamiliesService from "../services/families.service";

const familiesService = new FamiliesService()

interface FamiliesRequest extends Request {
  familyFromId: Family
}

export const FamiliesController = {
  findByParam: (req: FamiliesRequest, res: Response, next: NextFunction, id: any): void => {
    familiesService.getFamilyById(id)
      .then((family: Family) => {
        if(!family) {
          next(new Error('Not Found Error'))
        } else {
          req.familyFromId = family;
          next()
        }
      })
      .catch(error => next(error))
  },
  getAll: (req: Request, res: Response, next: NextFunction): void => {
    familiesService.getAll()
      .then((families: Family[]) => res.status(201).json(families))
      .catch(error => next(error))
  },
  getFamilyGuests: (req: FamiliesRequest, res: Response, next: NextFunction): void => {
    familiesService.getFamilyGuests(req.familyFromId)
      .then((guests: Guest[]) => res.status(201).json(guests))
      .catch(error => next(error))
  },
  createOne: (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.body);
    familiesService.createOne(req.body)
      .then((family: Family) => res.status(201).json(family))
      .catch(error => next(error))
  },
  getOne: (req: FamiliesRequest, res: Response, next: NextFunction) => {
    familiesService.getOne(req.familyFromId)
      .then((family: Family) => res.status(200).json(family))
      .catch(error => next(error))
  },
  updateOne: (req: FamiliesRequest, res: Response, next: NextFunction) => {
    const familyToUpdate = req.familyFromId
    const update = req.body
    familiesService.updateOne(familyToUpdate, update)
      .then((family: Family) => res.status(201).json(family))
      .catch(error => next(error))
  },
  deleteOne: (req: FamiliesRequest, res: Response, next: NextFunction) => {
    familiesService.deleteOne(req.familyFromId)
      .then((family: Family) => res.status(201).json(family))
      .catch(error => next(error))
  }
}
