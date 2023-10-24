import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Horario } from './entities/horarios.entity';

@Module({
  imports: [SequelizeModule.forFeature([Doctor, Horario])],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
