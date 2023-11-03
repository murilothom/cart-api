import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'

export class PaginationParams {
  @Type(() => Number)
  @Transform((value) => Number(value))
  @ApiProperty({ type: Number, example: 1 })
  public page: number
}
