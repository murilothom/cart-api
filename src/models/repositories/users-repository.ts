import { User } from '@prisma/client'
import { CreateUserDto } from '../types/dto/CreateUserDto'

export abstract class UsersRepository {
  abstract create(user: CreateUserDto): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
}
