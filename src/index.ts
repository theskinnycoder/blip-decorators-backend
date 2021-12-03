import express, { json, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { NODE_ENV, PORT } from './utils/constants'
import connectDB from './utils/connectDB'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import ContextType from './@types/ContextType'
import { WorkShopResolvers, AttendeeResolvers } from './resolvers'

await connectDB()

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
app.use(cookieParser())

const server = new ApolloServer({
  nodeEnv: NODE_ENV,
  schema: await buildSchema({
    resolvers: [WorkShopResolvers, AttendeeResolvers],
  }),
  context: ({ req, res }: ContextType) => ({ req, res }),
})

server.applyMiddleware({ app, cors: false })

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode is listening for request at http://localhost:${PORT}${server.graphqlPath}`,
  )
})
