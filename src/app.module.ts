/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './database/database.config';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PatientsModule } from './modules/patients/patients.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { TipoCitasModule } from './modules/tipo_citas/tipo_citas.module';
import { ConsultasModule } from './modules/consultas/consultas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    DoctorsModule,
    PatientsModule,
    SpecialtiesModule,
    TipoCitasModule,
    ConsultasModule,
  ],
})
export class AppModule {}
