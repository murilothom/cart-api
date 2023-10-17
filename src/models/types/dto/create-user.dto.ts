import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  public name: string

  @IsEmail()
  public email: string

  @IsString()
  @Length(6, 16)
  public password: string
}
