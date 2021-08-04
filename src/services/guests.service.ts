import { createClient, createPool } from "../config/db";
import Guest from "../modules/guests/models";

export default class GuestsService {

  async getGuestById(id: number): Promise<Guest> {
    try {
      const client = createClient()
      const {rows: [guest]} = await client.query('SELECT * FROM guests WHERE id = $1', [id])
      client.end()
      if (!guest) {
        return Promise.reject(new Error('Guest Found Error'))
      }
      return Promise.resolve(guest)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getAll(): Promise<Guest[]> {
    try {
      const client = createClient()
      const {rows: guests} = await client.query('SELECT * FROM guests')
      client.end()
      return Promise.resolve(guests)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  getOne(guest): Promise<Guest> {
    return Promise.resolve(guest)
  }

  async createOne(guest: Guest): Promise<Guest> {
    const client = createClient()
    const {rows} = await client.query('INSERT INTO guests (name, age, type, family_id) VALUES ($1, $2, $3, $4) RETURNING *', [
      guest.name, guest.age, guest.type, guest.family_id
    ]);
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }

  async updateOne(guestToUpdate: Guest, update: Guest): Promise <Guest> {
    const updatedGuest = {...guestToUpdate, ...update}
    const client = createClient();
    const {rows} = await client.query('UPDATE guests SET name = $2, age = $3, type = $4, family_id = $5 WHERE id = $1 RETURNING *', [
      updatedGuest.id, updatedGuest.name, updatedGuest.age, updatedGuest.type, updatedGuest.family_id
    ]);
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }

  async deleteOne(guest: Guest): Promise<Guest> {
    const client = createClient()
    const {rows} = await client.query('DELETE FROM guests WHERE id = $1 RETURNING *', [guest.id])
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }
}
