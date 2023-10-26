import { Module } from '@nestjs/common';
import { TipoCita } from './entities/cita_tipos.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TipoCitasController } from './tipo_citas.controller';
import { TipoCitasService } from './tipo_citas.service';

@Module({
  imports: [SequelizeModule.forFeature([TipoCita])],
  controllers: [TipoCitasController],
  providers: [TipoCitasService],
})
export class TipoCitasModule {}
