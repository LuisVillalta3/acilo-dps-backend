/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Horario } from './entities/horarios.entity';
import { Especialidad } from '../specialties/entities/specialties.entity';

@Module({
  imports: [SequelizeModule.forFeature([Doctor, Horario, Especialidad])],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
