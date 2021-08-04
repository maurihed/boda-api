import { Client, Pool } from "pg"

export const createClient = (): Client => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'boda',
    password: '1150',
    port: 5432,
  })
  client.connect()
  return client
}

export const createPool = (): Pool => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'boda',
    password: '1150',
    port: 5432,
  })
  return pool
}
