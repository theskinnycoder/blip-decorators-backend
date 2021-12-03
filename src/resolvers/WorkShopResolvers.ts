import { Arg, ID, Query, Resolver } from 'type-graphql'
import { User, WorkShop } from '@/entities'

@Resolver(() => WorkShop)
export default class WorkShopResolvers {
  @Query(() => [WorkShop]!)
  async getAllWorkshopsByUserID(@Arg('id', () => ID!) id: string) {
    try {
      const workshops = await User.find({
        where: { id },
        relations: ['workshop'],
      })
      return { error: null, data: workshops }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }

  @Query(() => WorkShop)
  async getWorkshopByID(@Arg('id', () => ID!) id: string) {
    try {
      const workshop = await WorkShop.findOne({
        where: { id },
        relations: ['user', 'attendee'],
      })
      return { error: null, data: workshop }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }
}
