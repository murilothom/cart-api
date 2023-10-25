import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class ChangeUserPasswordDto {
  @IsString()
  @Length(6, 16)
  @ApiProperty({ type: String, example: '12jj_@ll*' })
  public password: string

  @IsString()
  @Length(6, 16)
  @ApiProperty({ type: String, example: '00!3ml09$' })
  public new_password: string
}
