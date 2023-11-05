/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'schedules', timestamps: true, modelName: 'Horario', paranoid: true })
export class Horario extends Model {
  @Column({ primaryKey: true, autoIncrement: true, validate: { isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  id: number

  @Column({ allowNull: false, validate: { notEmpty: true, isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  dia: number

  @Column({ allowNull: false, validate: { notEmpty: true, isDate: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  inicio: Date

  @Column({ allowNull: false, validate: { notEmpty: true, isDate: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  fin: Date

  @Column({ allowNull: false, validate: { notEmpty: true, isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  idDoctor: number

  @Column({ allowNull: false })
  @ApiProperty({ readOnly: true, type: Boolean, example: true })
  disponible: boolean
}
