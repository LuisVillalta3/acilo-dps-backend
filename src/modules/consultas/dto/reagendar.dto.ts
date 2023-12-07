/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ReagendarDto {
  @ApiProperty({ type: Date, example: new Date() })
  @IsString({
    message: 'La fecha debe ser valida',
  })
  @IsNotEmpty({
    message: 'La fecha es requerida',
  })
  fecha: Date

  @ApiProperty({ type: Date, example: new Date() })
  @IsString({
    message: 'Hora inicio debe ser valida',
  })
  @IsNotEmpty({
    message: 'Hora inicio es requerida',
  })
  horaInicio: Date

  @ApiProperty({ type: Date, example: new Date() })
  @IsString({
    message: 'Hora fin debe ser valida',
  })
  @IsNotEmpty({
    message: 'Hora fin es requerida',
  })
  horaFin: Date
}
