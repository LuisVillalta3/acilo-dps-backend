/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class CreatePacienteDto {
  @ApiProperty({ type: String, example: 'Juan' })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  nombre: string

  @ApiProperty({ type: String, example: 'john@doe.com' })
  @IsString({
    message: 'El email debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  @IsEmail({}, {
    message: 'El email debe ser un email válido',
  })
  email: string

  @ApiProperty({ type: String, example: '12345678' })
  @IsString({
    message: 'El teléfono debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El teléfono es requerido',
  })
  telefono: string

  @ApiProperty({ type: String, example: '12345678' })
  @IsString({
    message: 'El whatsapp debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El whatsapp es requerido',
  })
  whatsapp: string

  @ApiProperty({ type: String, example: '12345678-9' })
  @IsString({
    message: 'El DUI debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El DUI es requerido',
  })
  dui: string

  @ApiProperty({ type: String, example: 'Direccion' })
  @IsString({
    message: 'La dirección debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La dirección es requerido',
  })
  direccion: string

  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty({
    message: 'La fecha de nacimiento es requerida',
  })
  fechaNacimiento: Date
}
