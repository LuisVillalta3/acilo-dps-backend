/* eslint-disable prettier/prettier */
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { DATABASE, HOST, PASSWORD, PORT, USERNAME } from 'src/secrets';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  retryAttempts: 5,
  autoLoadModels: true,
  synchronize: true,
};
