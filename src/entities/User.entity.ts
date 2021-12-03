import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, Index, OneToMany } from 'typeorm'
import Base from './Base.entity'
import WorkShop from './WorkShop.entity'

@Entity('user')
@ObjectType()
export default class User extends Base {
  @Index()
  @Length(6, 20, { message: 'must be 6-20 characters long' })
  @IsNotEmpty({ message: "display name can't be empty" })
  @Column({ name: 'display_name', unique: true })
  @Field({ nullable: false })
  displayName: string

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

  @OneToMany(() => WorkShop, (workshop) => workshop.manager)
  @Field(() => [WorkShop])
  workshops: WorkShop[]
}
