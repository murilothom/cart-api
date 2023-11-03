import { ApiProperty } from '@nestjs/swagger'
import { Cart } from '@prisma/client'

export class CartViewModel {
  @ApiProperty({
    type: String,
    example: 'd34f272a-82f8-449d-a1b2-c7e4e66872a8',
  })
  public id: string

  @ApiProperty({
    type: String,
    example: 'd34f272a-82f8-449d-a1b2-c7e4e66872a8',
  })
  public userId: string

  @ApiProperty({ type: Date, example: '2023-10-25T01:24:23.187Z' })
  public createdAt: Date

  @ApiProperty({ type: Date, example: '2023-10-29T01:24:23.187Z' })
  public updatedAt: Date | null
}

export function mapToCartViewModel(cart: Cart): CartViewModel {
  return {
    id: cart.id,
    userId: cart.userId,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  }
}
