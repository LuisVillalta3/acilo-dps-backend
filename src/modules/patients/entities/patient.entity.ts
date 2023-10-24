/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'patients', timestamps: true, modelName: 'Paciente', paranoid: true })
export class Paciente extends Model {
  @Column({ primaryKey: true, autoIncrement: true, validate: { isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  id: number

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: String, example: 'Juan' })
  nombre: string

  @Column({ allowNull: false, validate: { notEmpty: true, isEmail: true } })
  @ApiProperty({ readOnly: true, type: String, example: 'john@doe.com' })
  email: string

  @Column({ allowNull: true })
  @ApiProperty({ readOnly: true, type: String, example: '12345678' })
  telefono: string

  @Column({ allowNull: true })
  @ApiProperty({ readOnly: true, type: String, example: '12345678' })
  whatsapp: string

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: String, example: '12345678-9' })
  dui: string

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: String, example: 'lorem' })
  direccion: string

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  fechaNacimiento: Date
}
