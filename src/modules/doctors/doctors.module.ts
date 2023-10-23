import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
