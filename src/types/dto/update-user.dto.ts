import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  @ApiPropertyOptional({ type: String, example: 'John Doe' })
  public name?: string

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: String, example: 'example@email.com' })
  public email?: string
}
