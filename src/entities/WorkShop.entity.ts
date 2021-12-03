import { IsNotEmpty, Length } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import Attendee from './Attendee.entity'
import Base from './Base.entity'
import User from './User.entity'

@Entity('workshop')
@ObjectType()
export default class WorkShop extends Base {
  @Index()
  @IsNotEmpty({ message: 'email address must not be empty' })
  @Column({ type: 'varchar2', length: 50, nullable: false, unique: true })
  @Field({ nullable: false })
  name: string

  @Column({ type: 'text', length: 1000, nullable: true })
  @Field({ nullable: true })
  @Length(0, 1000)
  description: string

  @ManyToMany(() => Attendee, (attendee) => attendee.workshops)
  @JoinTable()
  @Field(() => [Attendee], { defaultValue: [] })
  attendees: Attendee[]

  @ManyToOne(() => User, (user) => user.workshops)
  @Field(() => User)
  @IsNotEmpty({ message: 'manager must not be empty' })
  manager: User
}
