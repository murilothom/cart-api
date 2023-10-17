import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../../src/models/repositories/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async create({
    email,
    name,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
