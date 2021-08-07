import { createClient } from "../config/db";
import Family from "../modules/families/models";
import Guest from "../modules/guests/models";

export default class FamiliesService {

  async getFamilyById(id: number): Promise<Family> {
    try {
      const client = createClient()
      const {rows: [family]} = await client.query('SELECT * FROM families WHERE id = $1', [id])
      client.end()
      if (!family) {
        return Promise.reject(new Error('family Found Error'))
      }
      return Promise.resolve(family)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getAll(): Promise<Family[]> {
    try {
      const client = createClient()
      const {rows: families} = await client.query('SELECT * FROM families')
      client.end()
      return Promise.resolve(families)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async getFamilyGuests(family: Family): Promise<Guest[]> {
    try {
      const client = createClient()
      const {rows: guests} = await client.query('SELECT * FROM guests WHERE family_id = $1', [family.id]);
      client.end()
      return Promise.resolve(guests)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  getOne(family: Family): Promise<Family> {
    return Promise.resolve(family)
  }

  async createOne(family: Family): Promise<Family> {
    const client = createClient()
    const {rows} = await client.query('INSERT INTO families (name, created_at, updated_at) VALUES ($1, current_timestamp, current_timestamp) RETURNING *', [
      family.name
    ]);
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }

  async updateOne(familyToUpdate: Family, update: Family): Promise <Family> {
    const updatedFamily = {...familyToUpdate, ...update}
    const client = createClient();
    const {rows} = await client.query('UPDATE families SET name = $2, updated_at = current_timestamp WHERE id = $1 RETURNING *', [
      updatedFamily.id, updatedFamily.name
    ]);
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }

  async deleteOne(family: Family): Promise<Family> {
    const client = createClient()
    const {rows} = await client.query('DELETE FROM families WHERE id = $1 RETURNING *', [family.id])
    client.end()
    if (!rows) {
      return Promise.reject(new Error('La familia no existe'))
    }
    return Promise.resolve(rows[0])
  }
}
