/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'

export class CompletarCitaDto {
  @ApiProperty({ type: Date, example: "Test" })
  notas: string
}
