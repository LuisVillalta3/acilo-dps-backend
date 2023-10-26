import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TipoCita } from './entities/cita_tipos.entity';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class TipoCitasService {
  constructor(
    @InjectModel(TipoCita)
    private tipoCitaModel: typeof TipoCita,
  ) {}

  async findAll(): Promise<TipoCita[]> {
    return this.tipoCitaModel.findAll();
  }

  async findOne(id: number): Promise<TipoCita> {
    const tipoCita = await this.tipoCitaModel.findByPk(id);

    if (!tipoCita) {
      throw new NotFoundException('Tipo de cita no encontrada');
    }

    return tipoCita;
  }
}
