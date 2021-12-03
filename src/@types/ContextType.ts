import { Request, Response } from 'express'
import User from '../entities/User.entity'

export default interface ContextType {
  req: Request
  res: Response
  user: User
}
