import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserViewModel {
  @ApiProperty({
    type: String,
    example: 'd34f272a-82f8-449d-a1b2-c7e4e66872a8',
  })
  public id: string

  @ApiProperty({ type: String, example: 'John Doe' })
  public name: string

  @ApiProperty({ type: String, example: 'example@email.com' })
  public email: string

  @ApiProperty({ type: Date, example: '2023-10-25T01:24:23.187Z' })
  public createdAt: Date

  @ApiProperty({ type: Date, example: '2023-10-29T01:24:23.187Z' })
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
