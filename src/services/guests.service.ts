import { GuestType } from "../modules/guests/enums";
import Guest from "../modules/guests/models";

export default class GuestsService {
  getGuestById(id: number): Promise<Guest> {
    const query = `SELECT * FROM guests WHERE id = ${id}`
    console.log(`Fetching guest... QUERY: ${query}`)
    const guest = {
      id: 1,
      name: 'Maria',
      type: GuestType.YOUNG_ADULT,
      age: 28,
      family_id: 1
    }
    return Promise.resolve(guest)
  }

  getAll(): Promise<Guest[]> {
    console.log('GET_ALL');
    return Promise.resolve([{
      id: 1,
      name: 'Maria',
      type: GuestType.YOUNG_ADULT,
      age: 28,
      family_id: 1
    }])
  }

  getOne(guest): Promise<Guest> {
    return Promise.resolve(guest)
  }

  createOne(guest: Guest): Promise<Guest> {
    console.log('creating Guest', guest)
    return Promise.resolve(guest)
  }

  updateOne(guestToUpdate: Guest, update: Guest): Promise <Guest> {
    console.log('Updating...', guestToUpdate, update);
    return Promise.resolve({...guestToUpdate, ...update})
  }

  deleteOne(guest: Guest): Promise<Guest> {
    console.log('Deleting Guest', guest)
    return Promise.resolve(guest)
  }
}