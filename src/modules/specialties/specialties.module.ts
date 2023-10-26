import { Module } from '@nestjs/common';
import { Especialidad } from './entities/specialties.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';

@Module({
  imports: [SequelizeModule.forFeature([Especialidad])],
  providers: [SpecialtiesService],
  controllers: [SpecialtiesController],
})
export class SpecialtiesModule {}
