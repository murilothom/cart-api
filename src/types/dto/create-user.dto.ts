import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({ type: String, example: 'John Doe' })
  public name: string

  @IsEmail()
  @ApiProperty({ type: String, example: 'example@email.com' })
  public email: string

  @IsString()
  @Length(6, 16)
  @ApiProperty({ type: String, example: '12jj_@ll*' })
  public password: string
}
