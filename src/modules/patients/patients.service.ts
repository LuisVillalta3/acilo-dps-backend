import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paciente } from './entities/patient.entity';
import { Op } from 'sequelize';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { CreatePacienteDto } from './dto/create-paciente.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Paciente)
    private pacienteModel: typeof Paciente,
  ) {}

  async findAll(name?: string): Promise<Paciente[]> {
    const where: any = {};

    if (name) {
      where.nombre = {
        [Op.iLike]: `%${name}%`,
      };
    }

    return this.pacienteModel.findAll({ where });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteModel.findByPk(id);

    if (!paciente) {
      throw new NotFoundException('Paciente not found');
    }

    return paciente;
  }

  async create(pacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = new Paciente();
    Object.assign(paciente, pacienteDto);

    return paciente.save();
  }

  async update(id: number, doctorDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);

    Object.assign(paciente, doctorDto);
    return paciente.save();
  }
}
