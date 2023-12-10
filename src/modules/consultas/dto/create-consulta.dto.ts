/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateConsultaDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  }, {
    message: 'El id de la especialidad debe ser un número entero',
  })
  @IsNotEmpty({
    message: 'El id de la especialidad es requerida',
  })
  idEspecialidad: number

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  }, {
    message: 'El doctor debe ser un número entero',
  })
  @IsNotEmpty({
    message: 'El id del doctor es requerida',
  })
  idDoctor: number

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  }, {
    message: 'El id del paciente debe ser un número entero',
  })
  @IsNotEmpty({
    message: 'El id del paciente es requerida',
  })
  idPaciente: number

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
