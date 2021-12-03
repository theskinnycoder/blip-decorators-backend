import { createConnection } from 'typeorm'
import { Attendee, User, WorkShop } from '@/entities'
import { DB_URL, IS_PROD } from './constants'

export default async function connectDB() {
  try {
    const conn = await createConnection({
      type: 'mysql',
      entities: [WorkShop, User, Attendee],
      logging: !IS_PROD,
      synchronize: !IS_PROD,
      url: DB_URL,
    })
    console.log(`connected to ${conn.name} database...`)
  } catch (error) {
    console.log(error.message)
  }
}
