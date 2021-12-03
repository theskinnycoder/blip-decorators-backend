import { config } from 'dotenv-safe'

config()

export const { NODE_ENV, PORT, DB_URL } = process.env
export const IS_PROD = NODE_ENV === 'production'
