/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'appointment_types', timestamps: true, modelName: 'TipoCita', paranoid: true })
export class TipoCita extends Model {
  @Column({ primaryKey: true, autoIncrement: true, validate: { isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  id: number

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: String, example: 'Juan' })
  nombre: string
}
