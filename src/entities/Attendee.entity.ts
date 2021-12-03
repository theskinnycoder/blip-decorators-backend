import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, Index, ManyToMany } from 'typeorm'
import Base from './Base.entity'
import Workshop from './WorkShop.entity'

@Entity('attendee')
@ObjectType()
export default class Attendee extends Base {
  @Index()
  @IsEmail(undefined, { message: 'must be a valid email address' })
  @IsNotEmpty({ message: 'email address must not be empty' })
  @Column({ length: 50, nullable: false, unique: true })
  @Field({ nullable: false })
  email: string

  @Index()
  @IsPhoneNumber('IN', { message: 'must be a valid phone number' })
  @Column({ name: 'phone_number', length: 12, nullable: true, unique: false })
  @Field({ nullable: true })
  phoneNumber: string

  @ManyToMany(() => Workshop, (workshop) => workshop.attendees)
  @Field(() => [Workshop], { defaultValue: [] })
  workshops: Workshop[]
}
