import { Arg, ID, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Attendee, User, WorkShop } from '@/entities'

@Resolver(() => Attendee)
export default class AttendeeResolvers {
  @Query(() => [Attendee]!)
  @UseMiddleware([])
  async getAllAttendeesByUserID(@Arg('id', () => ID!) id: string) {
    try {
      const user = await User.findOne({
        where: { id },
        relations: ['workshop'],
      })
      const allAttendees = user?.workshops.reduce(
        (acc: Attendee[], curr: WorkShop) => {
          return [...acc, ...curr.attendees]
        },
        [],
      )
      return { error: null, data: allAttendees }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }

  @Query(() => [Attendee]!)
  async getAllAttendeesByWorkshopID(@Arg('id', () => ID!) id: string) {
    try {
      const workshop = await WorkShop.findOne({
        where: { id },
        relations: ['attendee'],
      })
      return { error: null, data: workshop?.attendees }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }

  @Query(() => Attendee!)
  async getAttendeeByID(@Arg('id', () => ID!) id: string) {
    try {
      const attendee = await Attendee.findOne({
        where: { id },
        relations: ['workshop'],
      })
      return { error: null, data: attendee }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }

  @Query(() => Attendee!)
  async getAttendeeByEmail(@Arg('email') email: string) {
    try {
      const attendee = await Attendee.findOne({
        where: { email },
        relations: ['workshop'],
      })
      return { error: null, data: attendee }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }
}
