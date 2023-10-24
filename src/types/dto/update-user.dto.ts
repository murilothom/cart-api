import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  public name?: string

  @IsOptional()
  @IsEmail()
  public email?: string
}
