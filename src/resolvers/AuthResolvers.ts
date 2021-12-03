import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import ContextType from '@/@types/ContextType'
import User from '@/entities/User.entity'
import AuthService from '@/services/AuthService'

@Resolver(() => User)
export default class AuthResolvers {
  private readonly authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  @Mutation()
  async register(
    @Ctx() ctx: ContextType,
    @Arg('email') email: string,
    @Arg('displayName') displayName: string,
    @Arg('phoneNumber', { nullable: true }) phoneNumber?: string,
  ) {
    try {
      const token = ctx.req.headers.authorization?.split(' ')[1]!
      const { data, error } = await this.authService.authenticate(token)
      if (error) {
        throw new AuthenticationError(error)
      } else {
        const user = await User.create({
          email,
          displayName,
          phoneNumber,
        }).save()

        if (user) {
          return { error: null, data }
        } else {
          throw new ApolloError('User not created')
        }
      }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }

  @Mutation()
  async login(@Arg('email') email: string, @Ctx() ctx: any) {
    try {
      const token: string = ctx.req?.headers?.authorization.split(' ')[1]
      const { data, error } = await this.authService.authenticate(token)

      if (error) {
        throw new AuthenticationError(error)
      } else {
        const userExists = await User.findOne({ where: { email } })

        if (userExists) {
          throw new ApolloError('User already exists')
        } else {
          return { error: null, data }
        }
      }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }
}
