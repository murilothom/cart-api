import { ApiProperty } from '@nestjs/swagger'
import { UserViewModel } from '../user-view-model'

export class CreateUserResponse {
  @ApiProperty({ type: UserViewModel, example: UserViewModel })
  public user: UserViewModel
}
