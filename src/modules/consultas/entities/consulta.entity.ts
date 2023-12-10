/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model, BelongsTo } from 'sequelize-typescript'
import { Especialidad } from '../../specialties/entities/specialties.entity'
import { Doctor } from '../../doctors/entities/doctor.entity'
import { TipoCita } from '../../tipo_citas/entities/cita_tipos.entity'
import { Paciente } from '../../patients/entities/patient.entity'

@Table({ tableName: 'appointments', timestamps: true, modelName: 'Consulta', paranoid: true })
export class Consulta extends Model {
  @Column({ primaryKey: true, autoIncrement: true, validate: { isNumeric: true } })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  id: number

  @Column({ allowNull: false, validate: { notEmpty: true } })
  idEspecialidad: number

  @BelongsTo(() => Especialidad, 'idEspecialidad')
  @ApiProperty({ readOnly: true, type: Especialidad })
  especialidad: Especialidad

  @Column({ allowNull: false, validate: { notEmpty: true } })
  idDoctor: number

  @BelongsTo(() => Doctor, 'idDoctor')
  @ApiProperty({ readOnly: true, type: Doctor })
  doctor: Doctor

  @Column({ allowNull: false, validate: { notEmpty: true } })
  idTipoConsulta: number

  @BelongsTo(() => TipoCita, 'idTipoConsulta')
  @ApiProperty({ readOnly: true, type: TipoCita })
  tipoCita: TipoCita

  @Column({ allowNull: false, validate: { notEmpty: true } })
  idPaciente: number

  @BelongsTo(() => Paciente, 'idPaciente')
  @ApiProperty({ readOnly: true, type: Paciente })
  paciente: Paciente

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  fecha: Date

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  horaInicio: Date

  @Column({ allowNull: false, validate: { notEmpty: true } })
  @ApiProperty({ readOnly: true, type: Date, example: new Date() })
  horaFin: Date

  @Column({ allowNull: true })
  @ApiProperty({ readOnly: true, type: String, example: 'lorem' })
  notas: string

  @Column({ allowNull: false })
  @ApiProperty({ readOnly: true, type: Number, example: 1 })
  status: number

  @Column({ allowNull: false })
  @ApiProperty({ readOnly: true, type: String, example: '1234-5678-901234' })
  citaId: string

  @Column({ allowNull: true })
  @ApiProperty({ readOnly: true, type: Boolean, example: false })
  reagendada: boolean
}
