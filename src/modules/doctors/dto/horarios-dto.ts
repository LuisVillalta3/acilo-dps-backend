/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class HorarioDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, {
    message: 'El dia debe ser un número',
  })
  @IsNotEmpty({
    message: 'El dia es requerido',
  })
  dia: number

  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  inicio: Date

  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  fin: Date

  @ApiProperty({ type: Boolean, example: true })
  disponible: boolean
}
