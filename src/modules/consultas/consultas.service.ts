import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Consulta } from './entities/consulta.entity';
import {
  CONSULTAS_CANCELADAS,
  CONSULTAS_COMPLETADAS,
  CONSULTAS_EN_CURSO,
  CONSULTAS_TERMINADAS,
  PROXIMAS_CONSULTAS,
  STATUS_CONSULTA_TEXT,
} from './constants';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Especialidad } from '../specialties/entities/specialties.entity';
import { TipoCita } from '../tipo_citas/entities/cita_tipos.entity';
import { Paciente } from '../patients/entities/patient.entity';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Sequelize } from 'sequelize-typescript';
import { ReagendarDto } from './dto/reagendar.dto';
import { Op } from 'sequelize';
import { CompletarCitaDto } from './dto/completarCita.dto';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectModel(Consulta)
    private consultaModel: typeof Consulta,
    private sequelize: Sequelize,
  ) {}

  async findAll(
    includeDoctor?: boolean,
    includeEspecialidad?: boolean,
    includeTipoConsulta?: boolean,
    includePaciente?: boolean,
    proximasCitas?: boolean,
    limit?: number,
    status?: number,
  ): Promise<Consulta[]> {
    const include = [];
    const where: any = {};

    if (String(includeDoctor) === 'true') {
      include.push({ model: Doctor });
    }

    if (String(includeEspecialidad) === 'true') {
      include.push({ model: Especialidad });
    }

    if (String(includeTipoConsulta) === 'true') {
      include.push({ model: TipoCita });
    }

    if (String(includePaciente) === 'true') {
      include.push({ model: Paciente });
    }

    if (status) {
      where.status = {
        [Op.eq]: Number(status),
      };
    }

    if (String(proximasCitas) === 'true') {
      // status is equal to 1 or 5
      where.status = {
        [Op.or]: [1, 5],
      };
    }

    return this.consultaModel.findAll({
      include,
      where,
      limit,
      order: [['fecha', 'DESC']],
    });
  }

  async tipoConsultas(): Promise<any[]> {
    return Object.keys(STATUS_CONSULTA_TEXT).map((key) => ({
      id: key,
      nombre: STATUS_CONSULTA_TEXT[key],
    }));
  }

  async findOne(
    id: number,
    includeDoctor?: boolean,
    includeEspecialidad?: boolean,
    includeTipoConsulta?: boolean,
    includePaciente?: boolean,
  ): Promise<Consulta> {
    const include = [];

    if (String(includeDoctor) === 'true') {
      include.push({ model: Doctor });
    }

    if (String(includeEspecialidad) === 'true') {
      include.push({ model: Especialidad });
    }

    if (String(includeTipoConsulta) === 'true') {
      include.push({ model: TipoCita });
    }

    if (String(includePaciente) === 'true') {
      include.push({ model: Paciente });
    }

    const consulta = this.consultaModel.findByPk(id, { include });

    if (!consulta) {
      throw new NotFoundException('No se encontró la consulta');
    }

    return consulta;
  }

  async create(consultaDTO: CreateConsultaDto): Promise<Consulta> {
    await this.checkIfRecordsExists('Doctor', consultaDTO.idDoctor);
    await this.checkIfRecordsExists('Especialidad', consultaDTO.idEspecialidad);
    await this.checkIfRecordsExists('Paciente', consultaDTO.idPaciente);

    const consulta = new Consulta();

    Object.assign(consulta, consultaDTO);
    consulta.idTipoConsulta = 1;
    const citaId = `${new Date(consulta.fecha).getTime().toString()}-${
      consultaDTO.idEspecialidad
    }-${consultaDTO.idPaciente}`;

    consulta.citaId = citaId;
    consulta.status = PROXIMAS_CONSULTAS;

    return consulta.save();
  }

  async checkIfRecordsExists(model: string, id: number): Promise<void> {
    const record = this.sequelize.models[model].findByPk(id);

    if (!record) {
      throw new NotFoundException(`${model} not found`);
    }
  }

  async cancelarCita(id: number): Promise<Consulta> {
    const consulta = await this.findOne(id);

    consulta.status = CONSULTAS_CANCELADAS;

    return consulta.save();
  }

  async completarCita(
    id: number,
    completarCitaDto: CompletarCitaDto,
  ): Promise<Consulta> {
    const consulta = await this.findOne(id);

    consulta.status = CONSULTAS_COMPLETADAS;
    consulta.notas = completarCitaDto.notas;

    return consulta.save();
  }

  async comenzarConsulta(id: number): Promise<Consulta> {
    const consulta = await this.findOne(id);

    consulta.status = CONSULTAS_EN_CURSO;

    return consulta.save();
  }

  async terminarConsulta(id: number): Promise<Consulta> {
    const consulta = await this.findOne(id);

    consulta.status = CONSULTAS_TERMINADAS;

    return consulta.save();
  }

  async reagendarCita(id: number, reagendar: ReagendarDto): Promise<Consulta> {
    const consulta = await this.findOne(id);

    consulta.fecha = reagendar.fecha;
    consulta.horaInicio = reagendar.horaInicio;
    consulta.horaFin = reagendar.horaFin;
    consulta.status = PROXIMAS_CONSULTAS;

    return consulta.save();
  }

  async agendarProximaCita(
    id: number,
    reagendar: ReagendarDto,
  ): Promise<Consulta> {
    return this.sequelize.transaction(async (transaction) => {
      const consulta = await this.findOne(id, true, true, true, true);

      consulta.reagendada = true;
      await consulta.save({ transaction });

      const nuevaConsulta = new Consulta();

      nuevaConsulta.idEspecialidad = consulta.especialidad.id;
      nuevaConsulta.idDoctor = consulta.doctor.id;
      nuevaConsulta.idTipoConsulta = consulta.tipoCita.id;
      nuevaConsulta.idPaciente = consulta.paciente.id;
      nuevaConsulta.fecha = reagendar.fecha;
      nuevaConsulta.horaInicio = reagendar.horaInicio;
      nuevaConsulta.horaFin = reagendar.horaFin;
      nuevaConsulta.status = PROXIMAS_CONSULTAS;
      nuevaConsulta.notas = '';

      const citaId = `${new Date(consulta.fecha).getTime().toString()}-${
        consulta.especialidad.id
      }-${consulta.paciente.id}`;

      nuevaConsulta.citaId = citaId;

      return await nuevaConsulta.save({ transaction });
    });
  }

  async getConsultasByDoctor(idDoctor: number): Promise<Consulta[]> {
    const where: any = { idDoctor };

    return this.consultaModel.findAll({ where });
  }

  async getConsultasByPaciente(idPaciente: number): Promise<Consulta[]> {
    const where: any = { idPaciente };

    return this.consultaModel.findAll({ where });
  }

  async getConsultasByPacienteAndEspecialidad(
    idPaciente: number,
    idEspecialidad: number,
    excludeConsulta?: number,
  ): Promise<Consulta[]> {
    const where: any = { idPaciente, idEspecialidad };
    const include = [];

    include.push({ model: Doctor });
    include.push({ model: Especialidad });
    include.push({ model: TipoCita });

    if (excludeConsulta) {
      where.id = {
        [Op.ne]: excludeConsulta,
      };
    }

    return this.consultaModel.findAll({ where, include });
  }
}
