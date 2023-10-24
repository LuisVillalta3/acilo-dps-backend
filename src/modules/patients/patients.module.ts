import { Module } from '@nestjs/common';
import { Paciente } from './entities/patient.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
  imports: [SequelizeModule.forFeature([Paciente])],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
