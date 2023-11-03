import { User } from '@prisma/client'
import { CreateUserDto } from '../types/dto/create-user.dto'

export interface IUsersRepository {
  create(user: CreateUserDto): Promise<User>
  update(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  deleteById(id: string): Promise<void>
}
