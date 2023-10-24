import { User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CreateUserDto } from '../../src/types/dto/create-user.dto'
import { IUsersRepository } from '../../src/repositories/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async create({ email, name, password }: CreateUserDto): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async update(user: User): Promise<void> {
    const userIndex = this.items.findIndex((u) => u.id === user.id)

    this.items[userIndex] = user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
