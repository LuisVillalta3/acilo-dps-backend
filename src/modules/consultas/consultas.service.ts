import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Consulta } from './entities/consulta.entity';
import { STATUS_CONSULTA } from './constants';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Especialidad } from '../specialties/entities/specialties.entity';
import { TipoCita } from '../tipo_citas/entities/cita_tipos.entity';
import { Paciente } from '../patients/entities/patient.entity';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectModel(Consulta)
    private consultaModel: typeof Consulta,
  ) {}

  async findAll(
    includeDoctor?: boolean,
    includeEspecialidad?: boolean,
    includeTipoConsulta?: boolean,
    includePaciente?: boolean,
  ): Promise<Consulta[]> {
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

    return this.consultaModel.findAll({ include });
  }

  async tipoConsultas(): Promise<any[]> {
    return Object.keys(STATUS_CONSULTA).map((key) => ({
      id: key,
      nombre: STATUS_CONSULTA[key],
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
}
