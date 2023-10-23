/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'doctors', timestamps: true, modelName: 'Doctor', paranoid: true })
export class Doctor extends Model {
  @Column({ primaryKey: true, autoIncrement: true, validate: { isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  id: number

  @Column({ allowNull: false, validate: { notEmpty: true, isAlpha: true } })
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

  @Column({ defaultValue: true })
  @ApiProperty({ readOnly: true, type: Boolean, example: true })
  disponible: boolean
}
