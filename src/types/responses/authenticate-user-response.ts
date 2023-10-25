import { ApiProperty } from '@nestjs/swagger'

export class AuthenticateUserResponse {
  @ApiProperty({
    type: String,
    example: 'yJhbGciOiJPUzI2NiCsInN5xCI6IlpXKCJ8...',
  })
  public access_token: string
}
