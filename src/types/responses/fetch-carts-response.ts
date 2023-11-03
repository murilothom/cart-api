import { ApiProperty } from '@nestjs/swagger'
import { CartViewModel } from '../cart-view-model copy'

export class FetchCartsResponse {
  @ApiProperty({ type: [CartViewModel], example: [CartViewModel] })
  public carts: CartViewModel[]
}
