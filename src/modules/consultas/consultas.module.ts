import { Module } from '@nestjs/common';
import { Especialidad } from '../specialties/entities/specialties.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { TipoCita } from '../tipo_citas/entities/cita_tipos.entity';
import { Paciente } from '../patients/entities/patient.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Consulta } from './entities/consulta.entity';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Paciente,
      Especialidad,
      Doctor,
      TipoCita,
      Consulta,
    ]),
  ],
  providers: [ConsultasService],
  controllers: [ConsultasController],
})
export class ConsultasModule {}
