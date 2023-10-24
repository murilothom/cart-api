import { User } from '@prisma/client'

export class UserViewModel {
  public id: string

  public name: string

  public email: string

  public createdAt: Date

  public updatedAt: Date | null
}

export function mapToUserViewModel(user: User): UserViewModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
