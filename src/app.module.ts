import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './database/database.config';

@Module({
  imports: [ConfigModule.forRoot(), SequelizeModule.forRoot(databaseConfig)],
})
export class AppModule {}
