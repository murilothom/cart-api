import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class AuthenticateUserDto {
  @IsEmail()
  @ApiProperty({ type: String, example: 'example@email.com' })
  public email: string

  @IsString()
  @Length(6, 16)
  @ApiProperty({ type: String, example: '12jj_@ll*' })
  public password: string
}
