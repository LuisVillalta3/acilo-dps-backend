import { Injectable } from '@nestjs/common';
import { Especialidad } from './entities/specialties.entity';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Especialidad)
    private especialidadModel: typeof Especialidad,
  ) {}

  async findAll(): Promise<Especialidad[]> {
    return this.especialidadModel.findAll();
  }

  async findOne(id: number): Promise<Especialidad> {
    const especialidad = await this.especialidadModel.findByPk(id);

    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }

    return especialidad;
  }
}
