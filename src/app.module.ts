/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './database/database.config';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PatientsModule } from './modules/patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    DoctorsModule,
    PatientsModule,
  ],
})
export class AppModule {}
