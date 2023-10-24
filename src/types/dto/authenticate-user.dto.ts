import { IsEmail, IsString, Length } from 'class-validator'

export class AuthenticateUserDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(6, 16)
  public password: string
}
